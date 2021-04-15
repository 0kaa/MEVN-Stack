import cookies from "js-cookie";
export default function({ redirect }) {
  if (cookies.get("x-access-token")) {
    return redirect("/");
  }
}
