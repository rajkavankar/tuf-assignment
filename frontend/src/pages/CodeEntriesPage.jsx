import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import axios from "axios"
import moment from "moment"

const CodeEntriesPage = () => {
  const [codeEntries, setCodeEntries] = useState([])
  const languages = [
    {
      id: 1,
      title: "Javascript",
      icon: "/javascript.svg",
    },
    {
      id: 2,
      title: "Java",
      icon: "/java.svg",
    },
    {
      id: 3,
      title: "Python",
      icon: "/python.svg",
    },
    {
      id: 4,
      title: "C++",
      icon: "/cpp.svg",
    },
  ]

  useEffect(() => {
    const fetchCodeEntries = async () => {
      try {
        const { data } = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_SERVER_URI}/codeEntry`,
        })

        setCodeEntries(data?.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchCodeEntries()
  }, [])

  return (
    <div className='container'>
      <Table>
        <TableCaption>Code Entries</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>username</TableHead>
            <TableHead>code</TableHead>
            <TableHead>language</TableHead>
            <TableHead>submitted at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {codeEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>{entry.id}</TableCell>
              <TableCell>{entry.username}</TableCell>
              <TableCell>{entry.code.substring(0, 100)}</TableCell>
              <TableCell className='flex justify-center items-center gap-2'>
                <img
                  height={20}
                  width={20}
                  src={
                    languages.filter((item) => entry.language === item.title)[0]
                      .icon
                  }
                  alt='logo'
                />
                {entry.language}
              </TableCell>
              <TableCell>
                {moment(entry.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default CodeEntriesPage
