import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Settings } from "lucide-react"

export default function AutoResponsesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Auto Responses</h2>
        <p className="text-muted-foreground">Manage and customize your AI-powered automatic response templates.</p>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Response Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>
        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between">
            <Input className="max-w-sm" placeholder="Search templates..." />
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add New Template
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Positive Review Response", type: "Positive" },
              { name: "Negative Review Response", type: "Negative" },
              { name: "Neutral Review Response", type: "Neutral" },
              { name: "Feature Request Response", type: "Feature Request" },
              { name: "Bug Report Response", type: "Bug Report" },
              { name: "Thank You Response", type: "General" },
            ].map((template, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{template.name}</span>
                    <Button variant="ghost" size="sm">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                  <CardDescription>{template.type}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This is a sample response for a {template.type.toLowerCase()} review. Click edit to customize the
                    content.
                  </p>
                  <Button className="mt-4" variant="outline">
                    Edit Template
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Auto-Response Settings</CardTitle>
              <CardDescription>Configure your AI-powered auto-response system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ai-model">AI Model</Label>
                <Input id="ai-model" value="GPT-4" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="response-tone">Response Tone</Label>
                <Input id="response-tone" placeholder="e.g., Friendly, Professional, Casual" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max-length">Maximum Response Length</Label>
                <Input id="max-length" type="number" placeholder="e.g., 150 words" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords to Include</Label>
                <Textarea id="keywords" placeholder="Enter keywords separated by commas" />
              </div>
              <Button>Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

