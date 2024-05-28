'use client'

import { cn, formUrlQuery } from "@/lib/utils"
import { BankTabItemProps } from "@/types"
import { useRouter, useSearchParams } from "next/navigation"

export const BankTabItem = ({ account, appwriteItemId}: BankTabItemProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const isActive = appwriteItemId === account?.appwriteId
  

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: 'id',
      value: account?.appwriteId
    })
    router.push(newUrl, {scroll: false})
  }

  return (
    <div onClick={handleBankChange}
      className={cn(`banktab-item`, { " border-blue-600": isActive})}
    >
      <p className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500`, {
        " text-blue-600": isActive
      })}>
        {account.name}
      </p>
    </div>
  )
}