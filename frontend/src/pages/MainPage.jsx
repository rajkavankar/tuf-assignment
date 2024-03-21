import { useState, useCallback } from "react"
import CodeMirror from "@uiw/react-codemirror"
import { javascript } from "@codemirror/lang-javascript"
import { python } from "@codemirror/lang-python"
import { java } from "@codemirror/lang-java"
import { cpp } from "@codemirror/lang-cpp"
import { githubDark } from "@uiw/codemirror-theme-github"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import toast from "react-hot-toast"
import axios from "axios"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import FormInput from "@/components/FormInput"

const formSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: "username is required",
    })
    .max(20),
  stdin: z
    .string()
    .min(1, {
      message: "StdIn is required",
    })
    .max(5),
})

const MainPage = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      stdin: "",
    },
  })
  const [code, setCode] = useState("")
  const [language, setLanguage] = useState({
    id: 1,
    title: "Javascript",
    icon: "/javascript.svg",
    ext: javascript({ typescript: false, jsx: false }),
  })
  const onChange = useCallback((val) => {
    setCode(val)
  }, [])

  const languages = [
    {
      id: 1,
      title: "Javascript",
      icon: "/javascript.svg",
      ext: javascript({ typescript: false, jsx: false }),
    },
    {
      id: 2,
      title: "Java",
      icon: "/java.svg",
      ext: java(),
    },
    {
      id: 3,
      title: "Python",
      icon: "/python.svg",
      ext: python(),
    },
    {
      id: 4,
      title: "C++",
      icon: "/cpp.svg",
      ext: cpp(),
    },
  ]

  const onSubmit = async (values) => {
    if (code.length < 1) {
      return toast.error("Please add some code")
    }

    try {
      const { data } = await axios({
        method: "POST",
        url: `${import.meta.env.VITE_SERVER_URI}/codeEntry`,
        data: {
          username: values.username,
          language: language.title,
          code,
          stdin: values.stdin,
        },
      })

      if (data.success) {
        toast.success("Code added successfully")
        form.reset()
        setCode("")
      } else {
        toast.error(data.error ?? "Something went wrong")
      }
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }

  return (
    <div className=' container space-y-3 py-3'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
          <FormInput
            name='username'
            label='username'
            placeholder='Enter username'
          />
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl '>Code editor</h1>
            <div>
              <Select
                defaultValue={language.title}
                onValueChange={(val) => {
                  setLanguage(languages.filter((item) => item.title === val)[0])
                }}>
                <SelectTrigger>
                  <SelectValue placeholder='Select language' />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((item) => (
                    <SelectItem key={item.id} value={item.title}>
                      <div className='flex justify-between items-center space-x-3 w-full'>
                        <img
                          height={15}
                          width={15}
                          className='block'
                          src={item.icon}
                          alt={item.title}
                        />
                        <p>{item.title}</p>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <CodeMirror
            style={{
              fontSize: "1.2rem",
            }}
            value={code}
            theme={githubDark}
            onChange={onChange}
            height='300px'
            extensions={[language.ext]}
          />
          <FormInput name='stdin' label='Std in' placeholder='Enter stdin' />
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </div>
  )
}

export default MainPage
