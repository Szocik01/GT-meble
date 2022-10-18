export default function deleteSingleCookie(key)
{
    document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`
}