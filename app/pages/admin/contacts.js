import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DarkModeContext } from '../../components/DarkModeContext'; 

export default function Contacts() {
  const [contacts, setContacts] = useState([]);
  const { isDarkMode } = useContext(DarkModeContext);
  const supabase = useSupabaseClient();
  useEffect(() => {
    (async () => {
      let { data, error, status } = await supabase
        .from("contacts")
        .select(`id, firstname, lastname, email`);
      setContacts(data);
    })();
  }, [supabase]);

  return (
    <div className={`flex min-h-screen items-center justify-center bg-cover h-14 ${isDarkMode ? 'bg-gradient-to-b from-indigo-950 to-slate-950' : 'bg-white'}`}>
      <div className="not-prose mx-auto overflow-x-auto mb-64">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className={`overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg ${isDarkMode ? 'bg-black bg-opacity-40' : 'bg-white'}`}>
            <table className="min-w-full divide-y divide-slate-300">
              <thead className={`bg-slate-50 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <tr>
                <th
                  scope="col"
                  className={`py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6 ${isDarkMode ? 'bg-black text-white' : ''}`}
                >
                   Firstname
                </th>
                <th
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold ${isDarkMode ? 'bg-black text-white' : ''}`}
                >
                  Lastname
                </th>
                  <th
                  scope="col"
                  className={`px-3 py-3.5 text-left text-sm font-semibold ${isDarkMode ? 'bg-black text-white' : ''}`}
                  >
                     Email
                  </th>
                  <th
                    scope="col"
                   className={`px-3 py-3.5 text-left text-sm font-semibold ${isDarkMode ? 'bg-black text-white' : ''}`}
                  ></th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-200 bg-black' : 'divide-slate-200 bg-white'}`}>
                {contacts.map((contact) => (
                  <tr key={contact.email}>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>
                      {contact.firstname}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>
                      {contact.lastname}
                    </td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm ${isDarkMode ? 'text-white' : 'text-slate-500'}`}>
                      {contact.email}
                    </td>
                    <td>
                      <Link
                        href={`/admin/contacts/${contact.id}`}
                        className={
                          "w-5 h-5 block bg-slate-200 hover:bg-blue-500 hover:text-white rounded-full"
                        }
                      ></Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}