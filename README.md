# About

Web API for showing the number of github repos, total number of commits, all the languages used by the user and user's achievements (github badges).

## Examples

User Info:

`http://localhost:3000/api/v1/user`

Response:

```json
{
  "message": "ok",
  "info": {
    "name": "S. M. Waesh Ahmed",
    "username": "ysahmed",
    "avatar_url": "https://avatars.githubusercontent.com/u/31134625?v=4",
    "html_url": "https://github.com/ysahmed"
  }
}
```

Get total repositories:

`GET /api/v1/repos`

Response:

```json
{
  "message": "ok",
  "repos": 15
}
```

Get total number of commits

`GET /api/v1/commits`

Response:

```json
{
  "message": "ok",
  "commits": 117
}
```

Get all used programming languages

`GET /api/v1/languages`

Response:

```json
{
  "message": "ok",
  "languages": ["Kotlin", "JavaScript", "C"]
}
```

Get all github achievements (badges)

`GET /api/v1/achievements`

Response:

```json
{
  "message": "ok",
  "achievements": [
    {
      "achievement": "Starstruck",
      "img_url": "https://github.githubassets.com/images/modules/profile/achievements/starstruck-default--light-medium.png",
      "tier_text": "",
      "tier": "Default",
      "color": null
    },
    {
      "achievement": "Pair Extraordinaire",
      "img_url": "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
      "tier_text": "x2",
      "tier": "Bronze",
      "color": "#F9BFA7"
    }
  ]
}
```
