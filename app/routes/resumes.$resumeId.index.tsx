import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/resumes/$resumeId/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/resumes/$resumeId"!</div>
}
