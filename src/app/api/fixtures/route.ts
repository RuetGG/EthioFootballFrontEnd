// src/app/api/fixtures/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const league = searchParams.get("league") || "ETH";
  const team = searchParams.get("team") || "";
  const from = searchParams.get("from") || "";
  const to = searchParams.get("to") || "";

  try {
    const res = await fetch(
      `https://g6-ethio-football.onrender.com/fixtures?league=${league}${team ? `&team=${team}` : ""}${from ? `&from=${from}` : ""}${to ? `&to=${to}` : ""}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch fixtures" }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch fixtures" }, { status: 500 });
  }
}
