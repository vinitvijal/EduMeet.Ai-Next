'use client'
import React, { useState } from "react"
import { Book, BookOpen, FileText, LogIn, Mic, PenTool, Plus, Upload, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TeacherPortal() {
  const [activeClass, setActiveClass] = useState(null)
  const [chapters, setChapters] = useState([])
  const [isRecording, setIsRecording] = useState(false)

  const yourClasses = [
    { id: 1, name: "Mathematics 101", icon: <PenTool className="w-6 h-6" /> },
    { id: 2, name: "History 202", icon: <Book className="w-6 h-6" /> },
    { id: 3, name: "Physics 301", icon: <BookOpen className="w-6 h-6" /> },
  ]

  const students = [
    { id: 1, name: "Alice Johnson", status: "Enrolled" },
    { id: 2, name: "Bob Smith", status: "Pending" },
    { id: 3, name: "Charlie Brown", status: "Enrolled" },
  ]

  const handleCreateChapter = (chapterName) => {
    setChapters([...chapters, { id: chapters.length + 1, name: chapterName, content: [] }])
  }

  const handleFileUpload = (chapterId, file) => {
    setChapters(chapters.map(chapter => 
      chapter.id === chapterId 
        ? { ...chapter, content: [...chapter.content, { type: file.type, name: file.name }] }
        : chapter
    ))
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e, chapterId) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    handleFileUpload(chapterId, file)
  }

  const handleVoiceCapture = (chapterId) => {
    setIsRecording(!isRecording)
    // Implement actual voice recording logic here
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold text-primary">Edubridge</h1>
        <Button variant="ghost" size="icon">
          <LogIn className="w-6 h-6" />
          <span className="sr-only">Login</span>
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r p-4 overflow-y-auto">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full mb-4">Create Class</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Class</DialogTitle>
              </DialogHeader>
              <Label htmlFor="className">Class Name</Label>
              <Input id="className" placeholder="Enter class name" />
              <Button>Create</Button>
            </DialogContent>
          </Dialog>
          <h2 className="font-semibold mb-2">Your Classes</h2>
          <ul className="space-y-2">
            {yourClasses.map((cls) => (
              <li key={cls.id}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${activeClass === cls.id ? "bg-accent" : ""}`}
                  onClick={() => setActiveClass(cls.id)}
                >
                  {cls.icon}
                  <span className="ml-2">{cls.name}</span>
                </Button>
              </li>
            ))}
          </ul>
        </aside>
        <main className="flex-1 p-6 overflow-y-auto">
          <Tabs defaultValue="assignments" className="w-full">
            <TabsList>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="chapters">Chapters</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
            </TabsList>
            <TabsContent value="assignments">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Assignment Tools</h3>
                  <div className="space-y-2">
                    <Button className="w-full justify-start">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Test
                    </Button>
                    <Button className="w-full justify-start">
                      <Plus className="w-5 h-5 mr-2" />
                      Create Quiz
                    </Button>
                    <Button className="w-full justify-start">
                      <FileText className="w-5 h-5 mr-2" />
                      Share Information
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="students">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Student Management</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>{student.name}</TableCell>
                          <TableCell>{student.status}</TableCell>
                          <TableCell>
                            {student.status === "Pending" ? (
                              <>
                                <Button size="sm" className="mr-2">Accept</Button>
                                <Button size="sm" variant="destructive">Reject</Button>
                              </>
                            ) : (
                              <Button size="sm" variant="destructive">Remove</Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chapters">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Chapters</h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="mb-4">
                        <Plus className="w-5 h-5 mr-2" />
                        Create Chapter
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create a New Chapter</DialogTitle>
                      </DialogHeader>
                      <Label htmlFor="chapterName">Chapter Name</Label>
                      <Input id="chapterName" placeholder="Enter chapter name" />
                      <Button onClick={() => handleCreateChapter(document.getElementById('chapterName').value)}>Create</Button>
                    </DialogContent>
                  </Dialog>
                  {chapters.map((chapter) => (
                    <div key={chapter.id} className="mb-4 p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">{chapter.name}</h4>
                      <div 
                        className="p-4 border-2 border-dashed rounded-lg mb-2" 
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, chapter.id)}
                      >
                        <p className="text-center text-muted-foreground">Drag and drop PDF or PPT files here</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <Button onClick={() => document.getElementById(`fileUpload-${chapter.id}`).click()}>
                          <Upload className="w-5 h-5 mr-2" />
                          Upload Files
                        </Button>
                        <input 
                          id={`fileUpload-${chapter.id}`} 
                          type="file" 
                          accept=".pdf,.ppt,.pptx" 
                          className="hidden"
                          onChange={(e) => handleFileUpload(chapter.id, e.target.files[0])}
                        />
                        <Button onClick={() => handleVoiceCapture(chapter.id)}>
                          <Mic className="w-5 h-5 mr-2" />
                          {isRecording ? "Stop Recording" : "Start Voice Capture"}
                        </Button>
                      </div>
                      {chapter.content.length > 0 && (
                        <div className="mt-2">
                          <h5 className="font-semibold">Uploaded Content:</h5>
                          <ul>
                            {chapter.content.map((item, index) => (
                              <li key={index}>{item.name}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="content">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-4">Content Management</h3>
                  <p>Manage your course content here.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}