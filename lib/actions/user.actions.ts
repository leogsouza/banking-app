'use server'

import { LoginUser, SignUpParams } from "@/types"
import { createAdminClient, createSessionClient } from "../server/appwrite"
import { ID } from "node-appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({email, password}: LoginUser) => {
  try {
    const { account } = await createAdminClient()

    const response = await account.createEmailPasswordSession(email, password)

    return parseStringify(response)

  } catch (error) {
    console.log(error)
  }
}

export const signUp = async (userData: SignUpParams) => {
  const loggedInUser = await getLoggedInUser();
  console.log(loggedInUser)
  try {
    const {email, password, firstName, lastName} = userData

    const { account } = await createAdminClient()

    const newUser = await account.create(ID.unique(), email, password, `${firstName} ${lastName}`)
    const session = await account.createEmailPasswordSession(email, password)

    cookies().set('bank-session', session.secret, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: true,
    })

    return parseStringify(newUser)

  } catch (error) {
    console.log(error)
  }
}

export async function getLoggedInUser() {
  try {
    const {account } = await createSessionClient()
    const user =  await account.get()
    console.log('user', user)
    return parseStringify(user)
  } catch (error) {
    return null
  }
}