import { useState, useEffect } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import md from "markdown-it"

export default function Contacts({ id }) {
  const [contact, setContact] = useState(null)
  const supabase = useSupabaseClient()

  useEffect(() => {
    (async () => {
      let { data, error, status } = await supabase
        .from("contacts")
        .select(`id, firstname, lastname, email, message`)
        .eq("id", id)
        .single()
      setContact(data)
    })()
  }, [id, supabase])

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover h-14 bg-gradient-to-b from-indigo-950 to-slate-950">
      {contact && (
        <div className="overflow-hidden divide-x divide-slate-200 shadow ring-1 ring-black ring-opacity-5 md:rounded-lg mb-64">
          <div className="bg-slate-50">
            <dl className="grid grid-cols-[auto_1fr] px-3 py-4 [&_dt]:italic [&_dt]:text-slate-500 [&_dt]:pr-3">
              <dt>Name</dt>
              <dd>
                {contact.lastname}, {contact.firstname}
              </dd>
              <dt>Email</dt>
              <dd>{contact.email}</dd>
            </dl>
          </div>
          <div className="px-3 py-10 bg-white">
            <div
              dangerouslySetInnerHTML={{ __html: md().render(contact.message) }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {
      id: context.params.id,
    },
  }
}
