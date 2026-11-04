'use client'

import { useActionState } from 'react'
import { savePost } from './actions'
import MarkdownField from './MarkdownField'

type PostFormProps = {
  mode: 'new' | 'edit'
  postType: 'teaching' | 'blog'
  isPublished: boolean
  id?: string
  initial: Record<string, string>
}

export default function PostForm({ mode, postType, isPublished, id, initial }: PostFormProps) {
  const [state, formAction, isPending] = useActionState(savePost, { error: null, values: null })

  const teachingRequired = postType === 'teaching'

  return (
    <form action={formAction} className="space-y-6">
      {mode === 'edit' && id && (
        <input type="hidden" name="id" value={id} />
      )}
      <input type="hidden" name="post_type" value={postType} />

      <div className="bg-[#1E3F20]/10 p-4 rounded text-sm text-[#1E3F20]">
        {postType === 'teaching' ? (
          <p>Teaching: Burmese title and body are required, English and German optional.</p>
        ) : (
          <p>Blog: At least one language is enough (Burmese, English or German).</p>
        )}
      </div>

      <div>
        <label htmlFor="slug" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Slug
        </label>
        <input
          type="text"
          id="slug"
          name="slug"
          required
          defaultValue={state.values?.slug ?? initial.slug ?? ''}
          readOnly={isPublished}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">
          becomes the web address; cannot be changed after publishing
        </p>
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Status
        </label>
        {isPublished ? (
          <p className="text-[#1E3F20]">Published</p>
        ) : (
          <select
            id="status"
            name="status"
            defaultValue={state.values?.status ?? initial.status ?? 'draft'}
            className="text-base border border-gray-300 rounded p-2 w-full"
          >
            <option value="draft">Draft</option>
            <option value="review">Review</option>
          </select>
        )}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          defaultValue={state.values?.author ?? initial.author ?? 'Sayadaw Ashin Kusalasami'}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
      </div>

      <div>
        <label htmlFor="published_on" className="block text-sm font-medium text-[#1E3F20] mb-1">
          Published date
        </label>
        <input
          type="date"
          id="published_on"
          name="published_on"
          defaultValue={state.values?.published_on ?? initial.published_on ?? ''}
          className="text-base border border-gray-300 rounded p-2 w-full"
        />
        <p className="text-xs text-gray-600 mt-1">Optional</p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-[#1E3F20] mb-3">Burmese</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title_my" className="block text-sm font-medium text-[#1E3F20] mb-1">
                Title {teachingRequired && '(required)'}
              </label>
              <input
                type="text"
                id="title_my"
                name="title_my"
                defaultValue={state.values?.title_my ?? initial.title_my ?? ''}
                className="text-base border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="excerpt_my" className="block text-sm font-medium text-[#1E3F20] mb-1">
                Short text
              </label>
              <textarea
                id="excerpt_my"
                name="excerpt_my"
                rows={3}
                defaultValue={state.values?.excerpt_my ?? initial.excerpt_my ?? ''}
                className="text-base border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <MarkdownField
              id="content_my"
              name="content_my"
              label={`Body${teachingRequired ? ' (required)' : ''}`}
              lang="my"
              initialValue={state.values?.content_my ?? initial.content_my ?? ''}
              rows={12}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#1E3F20] mb-3">English</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title_en" className="block text-sm font-medium text-[#1E3F20] mb-1">
                Title
              </label>
              <input
                type="text"
                id="title_en"
                name="title_en"
                defaultValue={state.values?.title_en ?? initial.title_en ?? ''}
                className="text-base border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="excerpt_en" className="block text-sm font-medium text-[#1E3F20] mb-1">
                Short text
              </label>
              <textarea
                id="excerpt_en"
                name="excerpt_en"
                rows={3}
                defaultValue={state.values?.excerpt_en ?? initial.excerpt_en ?? ''}
                className="text-base border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <MarkdownField
              id="content_en"
              name="content_en"
              label="Body"
              lang="en"
              initialValue={state.values?.content_en ?? initial.content_en ?? ''}
              rows={12}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#1E3F20] mb-3">Deutsch</h3>
          <div className="space-y-4">
            <div>
              <label htmlFor="title_de" className="block text-sm font-medium text-[#1E3F20] mb-1">
                Title
              </label>
              <input
                type="text"
                id="title_de"
                name="title_de"
                defaultValue={state.values?.title_de ?? initial.title_de ?? ''}
                className="text-base border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <div>
              <label htmlFor="excerpt_de" className="block text-sm font-medium text-[#1E3F20] mb-1">
                Short text
              </label>
              <textarea
                id="excerpt_de"
                name="excerpt_de"
                rows={3}
                defaultValue={state.values?.excerpt_de ?? initial.excerpt_de ?? ''}
                className="text-base border border-gray-300 rounded p-2 w-full"
              />
            </div>
            <MarkdownField
              id="content_de"
              name="content_de"
              label="Body"
              lang="de"
              initialValue={state.values?.content_de ?? initial.content_de ?? ''}
              rows={12}
            />
          </div>
        </div>
      </div>

      {state.error && (
        <div role="alert" className="bg-red-50 border border-red-200 text-red-800 p-4 rounded">
          {state.error}
        </div>
      )}

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-[#1E3F20] text-white py-2 px-4 rounded hover:bg-[#163318] focus:outline-none focus:ring-2 focus:ring-[#1E3F20] focus:ring-offset-2 text-base disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <a
          href="/admin/posts"
          className="py-2 px-4 text-[#1E3F20] hover:underline focus:outline-none text-base"
        >
          Cancel
        </a>
      </div>
    </form>
  )
}
