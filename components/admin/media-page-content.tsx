"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { Search, Upload, Trash2, ImageIcon, Video, Copy, Check, FolderOpen } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminSidebar from "@/components/admin/admin-sidebar"
import AdminHeader from "@/components/admin/admin-header"

interface MediaFile {
  id: string
  name: string
  url: string
  type: "image" | "video"
  size: number
  createdAt: string
}

export default function MediaPageContent() {
  const [files, setFiles] = useState<MediaFile[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null)
  const [filterType, setFilterType] = useState<"all" | "image" | "video">("all")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchFiles = async () => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/admin/media")
      if (res.ok) {
        const data = await res.json()
        setFiles(data.files || [])
      }
    } catch (error) {
      console.error("Error fetching media:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles()
  }, [])

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files
    if (!uploadedFiles?.length) return

    setIsUploading(true)
    try {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i]
        const formData = new FormData()
        formData.append("file", file)

        await fetch("/api/admin/media/upload", {
          method: "POST",
          body: formData,
        })
      }
      fetchFiles()
    } catch (error) {
      console.error("Error uploading files:", error)
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDelete = async (fileId: string) => {
    if (!confirm("Jeste li sigurni da želite obrisati ovu datoteku?")) return

    try {
      const res = await fetch(`/api/admin/media/${fileId}`, {
        method: "DELETE",
      })
      if (res.ok) {
        fetchFiles()
        if (selectedFile?.id === fileId) {
          setSelectedFile(null)
        }
      }
    } catch (error) {
      console.error("Error deleting file:", error)
    }
  }

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    setCopiedUrl(url)
    setTimeout(() => setCopiedUrl(null), 2000)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || file.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="flex min-h-screen bg-background">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        <AdminHeader />
        <main className="flex-1 p-6 overflow-auto">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Mediji</h1>
                <p className="text-muted-foreground">Upravljajte slikama i videima</p>
              </div>
              <div className="flex gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleUpload}
                  className="hidden"
                  id="file-upload"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {isUploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-card border-border lg:col-span-2">
                <CardHeader>
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Pretraži datoteke..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-background border-border"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={filterType === "all" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType("all")}
                      >
                        Sve
                      </Button>
                      <Button
                        variant={filterType === "image" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType("image")}
                      >
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Slike
                      </Button>
                      <Button
                        variant={filterType === "video" ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType("video")}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Videi
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {[...Array(8)].map((_, i) => (
                        <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                      ))}
                    </div>
                  ) : filteredFiles.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {filteredFiles.map((file) => (
                        <div
                          key={file.id}
                          onClick={() => setSelectedFile(file)}
                          className={`aspect-square relative rounded-lg overflow-hidden border-2 cursor-pointer transition-all ${
                            selectedFile?.id === file.id ? "border-primary" : "border-border hover:border-primary/50"
                          }`}
                        >
                          {file.type === "image" ? (
                            <img
                              src={file.url || "/placeholder.svg"}
                              alt={file.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <Video className="w-12 h-12 text-muted-foreground" />
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                            <p className="text-white text-xs truncate">{file.name}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FolderOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Nema datoteka za prikaz</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardHeader>
                  <h2 className="font-bold text-foreground">Detalji datoteke</h2>
                </CardHeader>
                <CardContent>
                  {selectedFile ? (
                    <div className="space-y-4">
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        {selectedFile.type === "image" ? (
                          <img
                            src={selectedFile.url || "/placeholder.svg"}
                            alt={selectedFile.name}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <video src={selectedFile.url} controls className="w-full h-full" />
                        )}
                      </div>

                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-muted-foreground">Naziv</p>
                          <p className="text-foreground font-medium truncate">{selectedFile.name}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Tip</p>
                          <p className="text-foreground capitalize">{selectedFile.type}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Veličina</p>
                          <p className="text-foreground">{formatFileSize(selectedFile.size)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">URL</p>
                          <div className="flex items-center gap-2">
                            <Input
                              value={selectedFile.url}
                              readOnly
                              className="bg-background border-border text-xs font-mono"
                            />
                            <Button variant="ghost" size="icon" onClick={() => copyUrl(selectedFile.url)}>
                              {copiedUrl === selectedFile.url ? (
                                <Check className="w-4 h-4 text-green-500" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button
                          variant="outline"
                          className="flex-1 bg-transparent"
                          onClick={() => window.open(selectedFile.url, "_blank")}
                        >
                          Otvori
                        </Button>
                        <Button variant="destructive" onClick={() => handleDelete(selectedFile.id)} className="flex-1">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Obriši
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <ImageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Odaberi datoteku za prikaz detalja</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
