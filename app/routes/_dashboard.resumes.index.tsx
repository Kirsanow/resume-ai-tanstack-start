import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { createResume, getResumes } from '../server/resumes'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '~/components/ui/button'
import { Resume } from '~/types'
import { PlusCircle, FileText } from 'lucide-react'

const resumesQueryOptions = {
  queryKey: ['resumes'] as const,
  queryFn: async (): Promise<Resume[]> => {
    return await getResumes()
  },
}

export const Route = createFileRoute('/_dashboard/resumes/')({
  loader: async ({ context }) => {
    const data = await context.queryClient.ensureQueryData(resumesQueryOptions)
    return { resumes: data }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { resumes } = Route.useLoaderData()
  const router = useRouter()
  const queryClient = useQueryClient()
  return (
    <div className="min-h-screen bg-gray-background">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="mb-2 text-4xl font-bold text-foreground">
              My Resumes
            </h1>
            <p className="text-muted-foreground">
              Manage and create your professional resumes
            </p>
          </div>
          <Button
            size="lg"
            className="flex gap-2 items-center"
            onClick={async () => {
              const resume = await createResume()
              queryClient.setQueryData(['resumes'], (old: Resume[] = []) => {
                return [...old, resume]
              })
              router.navigate({
                to: '/resumes/$resumeId/edit',
                params: {
                  resumeId: resume.id,
                },
              })
            }}
          >
            <PlusCircle className="w-5 h-5" />
            Create New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="p-12 rounded-xl border bg-card shadow-xs border-border">
            <div className="mx-auto max-w-md text-center">
              <FileText className="mx-auto mb-4 w-12 h-12 text-muted-foreground" />
              <h3 className="mb-2 text-lg font-semibold text-foreground">
                No resumes yet
              </h3>
              <p className="mb-6 text-muted-foreground">
                Create your first resume and start your professional journey
              </p>
              <Button
                onClick={async () => {
                  const resume = await createResume()
                  queryClient.setQueryData(
                    ['resumes'],
                    (old: Resume[] = []) => {
                      return [...old, resume]
                    },
                  )
                  router.navigate({
                    to: '/resumes/$resumeId/edit',
                    params: {
                      resumeId: resume.id,
                    },
                  })
                }}
              >
                Create Your First Resume
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume: Resume) => (
              <Link
                key={resume.id}
                to="/resumes/$resumeId/edit"
                params={{ resumeId: resume.id }}
                className="block group"
              >
                <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-100">
                  <div className="flex justify-between items-start mb-4">
                    <FileText className="w-6 h-6 text-blue-500" />
                    <span className="text-sm text-gray-400">
                      Resume #{resume.id}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 transition-colors group-hover:text-blue-600">
                    View and Edit Resume
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Last modified: Recently
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
