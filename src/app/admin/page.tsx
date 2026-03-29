'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminDashboard() {
  const [projects, setProjects] = useState<any[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('Project') // Default
  const [size, setSize] = useState('small') // Default
  const [year, setYear] = useState('2026')
  const [file, setFile] = useState<File | null>(null)
  
  const [uploading, setUploading] = useState(false)
  const [refresh, setRefresh] = useState(0)
  
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function getProjects() {
      const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
      if (data) setProjects(data)
    }
    getProjects()
  }, [refresh, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  const handleDelete = async (id: string, url: string) => {
    // Extract filename from URL (e.g., https://.../project-images/filename.jpg)
    try {
      const fileName = url.split('/').pop()
      if (fileName) {
        await supabase.storage.from('project-images').remove([fileName])
      }
    } catch (err) {
      console.error('Failed to delete image', err)
    }

    await supabase.from('projects').delete().eq('id', id)
    setRefresh(r => r + 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return alert('Please select an image')

    setUploading(true)

    // 1. Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const { error: uploadError, data } = await supabase.storage
      .from('project-images')
      .upload(fileName, file)

    if (uploadError) {
      alert(`Upload Error: ${uploadError.message}`)
      setUploading(false)
      return
    }

    // 2. Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(fileName)

    // 3. Insert into Database
    const { error: dbError } = await supabase.from('projects').insert([
      { title, description, tag, url: publicUrl, size, year }
    ])

    if (dbError) {
      alert(`DB Error: ${dbError.message}`)
    } else {
      // Reset form
      setTitle('')
      setDescription('')
      setFile(null)
      setRefresh(r => r + 1)
    }
    
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-white text-zinc-900 font-sans">
      <nav className="border-b border-zinc-200 px-8 py-4 flex justify-between items-center bg-zinc-50">
        <h1 className="font-serif italic font-bold text-xl uppercase">Admin Dashboard</h1>
        <button onClick={handleSignOut} className="text-xs uppercase tracking-widest text-[#ff3355] hover:text-black transition-colors">
          Sign Out
        </button>
      </nav>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* ADD PROJECT FORM */}
        <section className="col-span-1 border border-zinc-200 p-8 shadow-sm rounded-sm">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-8 border-b border-zinc-200 pb-2">Add New Project</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-700 mb-2">Title</label>
              <input type="text" required value={title} onChange={e => setTitle(e.target.value)} className="w-full border border-zinc-200 p-2 text-sm focus:outline-none focus:border-[#ff3355]" />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-700 mb-2">Description</label>
              <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={3} className="w-full border border-zinc-200 p-2 text-sm focus:outline-none focus:border-[#ff3355]" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-700 mb-2">Tag</label>
                <select value={tag} onChange={e => setTag(e.target.value)} className="w-full border border-zinc-200 p-2 text-sm focus:outline-none focus:border-[#ff3355] bg-white">
                  <option>Project</option>
                  <option>Concept</option>
                  <option>Editorial</option>
                  <option>Art</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-700 mb-2">Grid Size</label>
                <select value={size} onChange={e => setSize(e.target.value)} className="w-full border border-zinc-200 p-2 text-sm focus:outline-none focus:border-[#ff3355] bg-white">
                  <option value="small">Small</option>
                  <option value="wide">Wide</option>
                  <option value="tall">Tall</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-700 mb-2">Year</label>
              <input type="text" value={year} onChange={e => setYear(e.target.value)} className="w-full border border-zinc-200 p-2 text-sm focus:outline-none focus:border-[#ff3355]" />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold tracking-widest text-zinc-700 mb-2">Image</label>
              <input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} className="w-full text-xs" />
            </div>

            <button disabled={uploading} type="submit" className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest hover:bg-[#ff3355] transition-colors disabled:opacity-50">
              {uploading ? 'Uploading...' : 'Publish Project'}
            </button>
          </form>
        </section>

        {/* PROJECT LIST */}
        <section className="col-span-1 lg:col-span-2">
          <h2 className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-8 border-b border-zinc-200 pb-2">Existing Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(p => (
              <div key={p.id} className="border border-zinc-200 p-4 flex gap-4 items-center bg-zinc-50 hover:bg-white transition-colors">
                <div className="relative w-20 h-20 bg-zinc-200 flex-shrink-0">
                  <Image src={p.url} alt={p.title} fill className="object-cover grayscale" />
                </div>
                <div className="flex-1">
                  <h3 className="font-serif italic text-xl font-bold">{p.title}</h3>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1">{p.tag} / {p.year}</p>
                  <p className="text-xs text-zinc-600 mt-2 line-clamp-1">{p.description}</p>
                </div>
                <button onClick={() => handleDelete(p.id, p.url)} className="text-[#ff3355] text-xs uppercase tracking-wider hover:text-black">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
