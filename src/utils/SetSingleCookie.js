export default function setSingleCookie(key,value,expirationInMinutes)
{
    const expiration = (new Date(Date.now() + expirationInMinutes*60*1000)).toUTCString();
    document.cookie=`${key}=${value}; expires=${expiration}`;
}