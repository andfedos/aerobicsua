"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import SiteLayout from "@/components/layout/SiteLayout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import { useState } from "react"

const schema = z.object({
  email: z.string().email("Невірний email"),
  fullName: z.string().min(2, "Вкажіть ПІБ"),
  password: z.string().min(8, "Мінімум 8 символів"),
  phone: z.string().optional(),
  accountType: z.enum(["ATHLETE", "COACH_JUDGE"]),
  dob: z.string().optional(),
  roleInClub: z.enum(["COACH", "JUDGE"]).optional(),
  joinLater: z.boolean().optional(),
  clubId: z.string().optional(),
}).superRefine((v, ctx) => {
  if (v.accountType === "ATHLETE" && !v.dob) {
    ctx.addIssue({ code: "custom", message: "Дата народження обовʼязкова", path: ["dob"] })
  }
  if (v.accountType === "COACH_JUDGE") {
    if (!v.roleInClub) ctx.addIssue({ code: "custom", message: "Оберіть роль у клубі", path: ["roleInClub"] })
    if (!v.joinLater && !v.clubId) ctx.addIssue({ code: "custom", message: "Оберіть клуб або «приєднаюсь пізніше»", path: ["clubId"] })
  }
})

type FormData = z.infer<typeof schema>

export default function RegisterPage() {
  const [clubs] = useState([{ id: "1", name: "Клуб «Динамо»" }, { id: "2", name: "Клуб «Спарта»" }])

  const { register, handleSubmit, watch, setValue, formState: { errors } } =
    useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { accountType: "ATHLETE", joinLater: false } })

  const accountType = watch("accountType")
  const joinLater = watch("joinLater")

  const onSubmit = (v: FormData) => {
    console.log("REGISTER_FORM_DATA:", v)
    toast.success("Форма валідна. Дані в консолі (поки без бекенда).")
  }

  return (
    <SiteLayout>
      <section className="container-custom py-10 max-w-2xl">
        <h1 className="text-h2 mb-6">Реєстрація</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" placeholder="you@example.com" {...register("email")} />
              {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
            </div>
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" placeholder="********" {...register("password")} />
              {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="fullName">ПІБ</Label>
            <Input id="fullName" placeholder="Прізвище Імʼя" {...register("fullName")} />
            {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Телефон (необовʼязково)</Label>
            <Input id="phone" placeholder="+380..." {...register("phone")} />
          </div>

          <div>
            <Label>Я —</Label>
            <RadioGroup
              defaultValue="ATHLETE"
              onValueChange={(val) => setValue("accountType", val as "ATHLETE" | "COACH_JUDGE")}
              className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2"
            >
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem id="athlete" value="ATHLETE" />
                <Label htmlFor="athlete">Спортсмен</Label>
              </div>
              <div className="flex items-center space-x-2 border rounded-md p-3">
                <RadioGroupItem id="coachjudge" value="COACH_JUDGE" />
                <Label htmlFor="coachjudge">Тренер/Суддя</Label>
              </div>
            </RadioGroup>
          </div>

          {accountType === "ATHLETE" && (
            <div>
              <Label htmlFor="dob">Дата народження</Label>
              <Input id="dob" type="date" {...register("dob")} />
              {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
            </div>
          )}

          {accountType === "COACH_JUDGE" && (
            <div className="space-y-4">
              <div>
                <Label>Роль у клубі</Label>
                <Select onValueChange={(v) => setValue("roleInClub", v as "COACH" | "JUDGE")}>
                  <SelectTrigger><SelectValue placeholder="Оберіть роль" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="COACH">Тренер</SelectItem>
                    <SelectItem value="JUDGE">Суддя</SelectItem>
                  </SelectContent>
                </Select>
                {errors.roleInClub && <p className="text-red-600 text-sm">{errors.roleInClub.message}</p>}
              </div>

              <div className="flex items-center gap-2">
                <input id="joinLater" type="checkbox" className="h-4 w-4" {...register("joinLater")} />
                <Label htmlFor="joinLater">Немає клубу — приєднаюсь пізніше</Label>
              </div>

              {!joinLater && (
                <div>
                  <Label>Клуб</Label>
                  <Select onValueChange={(v) => setValue("clubId", v)}>
                    <SelectTrigger><SelectValue placeholder="Оберіть клуб" /></SelectTrigger>
                    <SelectContent>
                      {clubs.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  {errors.clubId && <p className="text-red-600 text-sm">{errors.clubId.message}</p>}
                </div>
              )}
            </div>
          )}

          <Button type="submit" className="w-full">Зареєструватися</Button>
        </form>
      </section>
    </SiteLayout>
  )
}
