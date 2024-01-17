import {getAccessToken} from "@auth0/nextjs-auth0";
import {NextResponse} from "next/server";

const backendApi = process.env.NEXT_PUBLIC_API_URL;

export async function POST(req: any) {
  // const {accessToken} = await getAccessToken(req);
  // const body = await req.json();

  // const response = await fetch(`${backendApi}/api/user/${body.userName}`,
  //   {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //       Authorization: `Bearer ${accessToken}`
  //     }
  //   });

  // const responseJson = await response.json();
  // return NextResponse.json(responseJson);
  return NextResponse.json({message: "smth"})
}

export async function PUT(req: any){
  const  {accessToken} = await getAccessToken(req);
  const body = await req.json();

  const response = await fetch(`${backendApi}/api/user`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(body)
  });

  const responseJson = await response.json();
  return NextResponse.json(responseJson);
}

export async function GET(req: any) {
  const {accessToken} = await getAccessToken(req);

  const response = await fetch(`${backendApi}/api/user`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    }
  });

  const responseJson = await response.json();
  return NextResponse.json(responseJson);
}
