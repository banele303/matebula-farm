import type { NextRequest } from "next/server";
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

type RouteContext = {
	params: Promise<{
		kindeAuth: string;
	}>;
};

async function resolveEndpoint(context: RouteContext) {
	const { kindeAuth } = await context.params;
	return kindeAuth;
}

export async function GET(request: NextRequest, context: RouteContext) {
	const endpoint = await resolveEndpoint(context);
	const response = await (handleAuth(request, endpoint) as unknown as Promise<Response>);
	return response;
}

export async function POST(request: NextRequest, context: RouteContext) {
	const endpoint = await resolveEndpoint(context);
	const response = await (handleAuth(request, endpoint) as unknown as Promise<Response>);
	return response;
}
