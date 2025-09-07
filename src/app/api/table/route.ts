// src/app/api/table/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get("league") || "ETH";
  const season = searchParams.get("season") || "2021";

  try {
    const res = await fetch(
      `https://g6-ethio-football.onrender.com/standings?league=${league}&season=${season}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch table" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch table" }, { status: 500 });
  }
}
