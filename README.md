# Dream SMP Timeline
All streams/videos of the smp cut into a big timeline

## Developers

You may notice that some of the key dependencies like react, styled-components, etc are not installed. This **is** intentional. It is to reduce project size. The reason snowpack, typescript, and your IDE don't complain that these aren't installed is because in Snowpack's V3 update, it allows remote imports. This means it treeshakes what you are importing and copies type definitions to `.snowpack/.snowpack/types` (may change to a single `.snowpack` must be a bug) and replaces your imports with these remote urls in development and downloads them to the static build directory in production. Pretty smart right? Snowpack is amazing I love it.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://discord.gg/bc8Y2y9"><img src="https://avatars0.githubusercontent.com/u/27270386?v=4?s=100" width="100px;" alt=""/><br /><sub><b>Floffah</b></sub></a><br /><a href="https://github.com/Floffah/collaborated/commits?author=Floffah" title="Code">💻</a> <a href="https://github.com/Floffah/collaborated/commits?author=Floffah" title="Documentation">📖</a> <a href="#design-Floffah" title="Design">🎨</a> <a href="#ideas-Floffah" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-Floffah" title="Project Management">📆</a> <a href="#question-Floffah" title="Answering Questions">💬</a> <a href="https://github.com/Floffah/collaborated/pulls?q=is%3Apr+reviewed-by%3AFloffah" title="Reviewed Pull Requests">👀</a> <a href="#research-Floffah" title="Research">🔬</a> <a href="#security-Floffah" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
