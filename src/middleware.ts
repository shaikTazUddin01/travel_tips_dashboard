import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { decodedToken } from "./utils/decodedToken";
import { TUser } from "./redux/features/auth/authSlice";
// Public routes accessible without authentication
const AuthRoutes = ["/login"];



export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // console.log(pathname);
  const accessToken = request.cookies.get("accessToken")?.value;
 

  let user;

  // Decode token only if it exists
  if (accessToken) {
    try {
      user = (await decodedToken(accessToken)) as TUser | undefined;
    } catch (error) {
      console.error("Token decoding failed:", error);
    }
  }

 
  if (user && user.role=="ADMIN") {
  
    if (AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next()
  } else {
    if (!AuthRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
    "/login",
   
  ],
};