import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    try {
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Auth callback error:", error)
        return NextResponse.redirect(`${requestUrl.origin}/login?error=auth_failed`)
      }

      if (data.user) {
        // Create or update user profile
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          full_name: data.user.user_metadata?.full_name || data.user.user_metadata?.name || "",
          is_premium: false,
          subscription_tier: "free",
          updated_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Profile creation error:", profileError)
        }

        return NextResponse.redirect(`${requestUrl.origin}/dashboard`)
      }
    } catch (error) {
      console.error("Unexpected auth error:", error)
      return NextResponse.redirect(`${requestUrl.origin}/login?error=unexpected`)
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/login?error=no_code`)
}
