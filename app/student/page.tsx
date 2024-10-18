'use client'
import React from "react"
import { Book, BookOpen, Download, LogIn, MessageSquare, PenTool, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentPortal() {
  const [activeClass, setActiveClass] = React.useState<null | Number>(null)

  const enrolledClasses = [
    { id: 1, name: "Mathematics 101", icon: <PenTool className="w-6 h-6" /> },
    { id: 2, name: "History 202", icon: <Book className="w-6 h-6" /> },
    { id: 3, name: "Physics 301", icon: <BookOpen className="w-6 h-6" /> },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="flex justify-between items-center p-4 border-b">
        <h1 className="text-2xl font-bold text-primary">EduBridge</h1>
        <Button variant="ghost" size="icon">
          <LogIn className="w-6 h-6" />
          <span className="sr-only">Login</span>
        </Button>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r p-4 overflow-y-auto">
          <Button className="w-full mb-4">Join Classes</Button>
          <h2 className="font-semibold mb-2">Enrolled Classes</h2>
          <ul className="space-y-2">
            {enrolledClasses.map((cls) => (
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
          <Tabs defaultValue="assessments" className="w-full">
            <TabsList>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="qna">QNA</TabsTrigger>
              <TabsTrigger value="prep">Prep</TabsTrigger>
              <TabsTrigger value="saved">Saved</TabsTrigger>
            </TabsList>
            <TabsContent value="assessments">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Pending Assignments</h3>
                  <ul className="list-disc list-inside">
                    <li>Mathematics Assignment 3</li>
                    <li>History Essay: Industrial Revolution</li>
                    <li>Physics Lab Report: Projectile Motion</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="qna">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Recent Discussions</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <MessageSquare className="w-5 h-5 mr-2 mt-1" />
                      <div>
                        <p className="font-medium">Calculus Integration Techniques</p>
                        <p className="text-sm text-muted-foreground">Last activity: 2 hours ago</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <MessageSquare className="w-5 h-5 mr-2 mt-1" />
                      <div>
                        <p className="font-medium">World War II Timeline</p>
                        <p className="text-sm text-muted-foreground">Last activity: 1 day ago</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="prep">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Practice Sessions</h3>
                  <ul className="space-y-2">
                    <li>
                      <Button variant="outline" className="w-full justify-start">
                        <PenTool className="w-5 h-5 mr-2" />
                        Math Quiz: Derivatives
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full justify-start">
                        <Book className="w-5 h-5 mr-2" />
                        History Flashcards: Ancient Civilizations
                      </Button>
                    </li>
                    <li>
                      <Button variant="outline" className="w-full justify-start">
                        <BookOpen className="w-5 h-5 mr-2" />
                        Physics Problem Set: Thermodynamics
                      </Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="saved">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Saved Content</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      <span>Calculus Cheat Sheet</span>
                    </li>
                    <li className="flex items-center">
                      <Download className="w-5 h-5 mr-2" />
                      <span>History Timeline Template</span>
                    </li>
                    <li className="flex items-center">
                      <Star className="w-5 h-5 mr-2" />
                      <span>Physics Formula Reference</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}