export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "the Game on Paper",
  description:
    "Where advanced stats meet paper.",
  url: "https://thegameonpaper.com",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "CFB",
      href: "cfb/scoreboard",
    },
  ],
  cfbNav: [
      {
        title: "Scoreboard",
        href: "/cfb/scoreboard",
      },
      {
        title: "Team Stats",
        href: "/cfb/team-stats",
      },
      {
        title: "Player Stats",
        href: "/cfb/player-stats",
      },
      {
        title: "Teams",
        href: "/cfb/teams",
      },
  ],
  links: {
    twitter: "https://twitter.com/sportsdataverse",
    github: "https://github.com/saiemgilani/game-on-paper",
  },
}
