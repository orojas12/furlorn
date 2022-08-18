const URL = "http://localhost:8000/api/posts";

export async function fetchCreatePost(
  data: any,
  token: any
): Promise<{
  ok: boolean;
  status: number | null;
  error: string;
  data: {} | null;
}> {
  let res;
  try {
    res = await fetch(URL, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: data,
    });
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      status: null,
      error: "Something went wrong.",
      data: null,
    };
  }
  data = await res.json();
  return { ok: res.ok, status: res.status, error: data.detail || "", data };
}
