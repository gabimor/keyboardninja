export function getTitle(url: string, param?: string) {
  const titles = new Map<string, string>();
  titles.set("/", "Keyboard Ninja.Me");
  titles.set("/wannahelp", "Wanna Help? | Keyboard Ninja.Me");
  titles.set("/login", "Log in | Keyboard Ninja.Me");
  titles.set("/signup", "Sign up | Keyboard Ninja.Me");
  titles.set("/:app", "$param | Keyboard Ninja.Me");

  let title = titles.get(url);
  if (!title) title = titles.get("/");

  if (param) title = title.replace("$param", param);

  return title;
}
