import { NextRequest, NextResponse } from "next/server";

const VK_TOKEN_ENDPOINT = "https://id.vk.com/oauth2/token";
const VK_USERS_ENDPOINT = "https://api.vk.com/method/users.get";
const VK_API_VERSION = "5.199";

const readJsonBody = async (request: NextRequest) => {
  try {
    return (await request.json()) as { code?: string };
  } catch {
    return {};
  }
};

const createErrorResponse = (message: string, status = 400) =>
  NextResponse.json({ error: message }, { status });

const fetchVkToken = async (
  code: string,
  clientId: string,
  clientSecret: string,
  redirectUri: string,
) => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    code,
  });

  const response = await fetch(VK_TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const payload = (await response.json().catch(() => ({}))) as
    | VkTokenSuccessResponse
    | VkTokenErrorResponse;

  if (!response.ok) {
    throw new Error(
      "error" in payload && payload.error_description
        ? payload.error_description
        : (payload.error ?? "VK token exchange failed"),
    );
  }

  if ("error" in payload) {
    throw new Error(payload.error_description ?? payload.error);
  }

  return payload;
};

type VkTokenSuccessResponse = {
  access_token: string;
  refresh_token?: string;
  token_type?: string;
  user_id?: number;
  expires_in?: number;
};

type VkTokenErrorResponse = {
  error: string;
  error_description?: string;
};

type VkUserResponse = {
  response?: Array<{
    id: number;
    first_name?: string;
    last_name?: string;
    photo_200?: string;
  }>;
  error?: {
    error_msg?: string;
  };
};

const fetchVkProfile = async (accessToken: string) => {
  const query = new URLSearchParams({
    v: VK_API_VERSION,
    access_token: accessToken,
    fields: "photo_200",
  });

  const response = await fetch(`${VK_USERS_ENDPOINT}?${query.toString()}`, {
    method: "GET",
  });

  const payload = (await response.json().catch(() => ({}))) as VkUserResponse;

  if (payload.error) {
    throw new Error(payload.error.error_msg ?? "VK user fetch failed");
  }

  const profile = payload.response?.[0];

  if (!profile) {
    return null;
  }

  return {
    id: String(profile.id),
    firstName: profile.first_name,
    lastName: profile.last_name,
    avatar: profile.photo_200,
  };
};

export const POST = async (request: NextRequest) => {
  const { code } = await readJsonBody(request);

  if (!code) {
    return createErrorResponse("Missing authorization code", 400);
  }

  const clientId = process.env.NEXT_PUBLIC_VK_APP_ID;
  const clientSecret = process.env.VK_APP_SECRET;
  const redirectUri = process.env.VK_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return createErrorResponse("VK configuration is incomplete", 500);
  }

  try {
    const tokenPayload = await fetchVkToken(
      code,
      clientId,
      clientSecret,
      redirectUri,
    );
    const profile = tokenPayload.access_token
      ? await fetchVkProfile(tokenPayload.access_token).catch(() => null)
      : null;

    return NextResponse.json({
      token: tokenPayload.access_token,
      refreshToken: tokenPayload.refresh_token ?? null,
      expiresIn: tokenPayload.expires_in ?? null,
      userId: tokenPayload.user_id ? String(tokenPayload.user_id) : null,
      profile,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : String(error ?? "unknown");

    return createErrorResponse(message, 400);
  }
};
