import { Message } from "discord.js";

const messageTemplate = `<div class="message">
<img class="avatar" src="%AvatarURL%">
<div class="content">
    <div class="info">
        %UserTag% <span class="msgTimestamp">%CreatedTimeStamp%</span>
    </div>
    <div class="messageContent">
    %MessageContent%
    </div>
    %Embeds%
    %Images%
    %Files%
</div>`;

const fileTemplate = `<div class="attachmentFile">
    <div class="fileName">%FileName%</div>
    <div class="fileSize">%FileSize%</div>
    <div class="downloadBtn"><a href="%FileURL%" target="_blank" rel="noopener noreferrer">Download</a></div>
</div>`;

export const getMessage = (message: Message, locale?: string) => {
    let temp = messageTemplate;
    temp.replace("%AvatarURL%", message.member.displayAvatarURL());
    temp.replace("%UserTag%", message.author.tag);
    temp.replace(
        "%CreatedTimeStamp%",
        `${message.createdAt.toLocaleString(locale || "en-US")}${
            message.editedAt
                ? ` (Edited at ${message.editedAt.toLocaleString(
                      locale || "en-US"
                  )})`
                : ""
        }`
    );
    let content = message.content.replace("\n", "<br>");
    content.replace(
        /<@[0-9]{17-20}>/,
        `<span class="highlight">@${
            message.guild.members.cache.get("$&").user.username
        }</span>`
    );
    content.replace(
        /<#[0-9]{17-20}>/,
        `<span class="highlight">#${
            message.guild.channels.cache.get("$&").name
        }</span>`
    );
    content.replace(
        /\|\|.+\|\|/,
        `<span class="spoiler">${"$&".slice(2, -2)}</span>`
    );
    content.replace(
        /\*\*.+\*\*/,
        `<span class="bold">${"$&".slice(2, -2)}</span>`
    );
    content.replace(
        /~~.+~~/,
        `<span class="strike">${"$&".slice(2, -2)}</span>`
    );
    content.replace(/```.+```/, `<span class="codeB">${'$&'.slice(3, -3)}</span><br>`)
    temp.replace("%MessageContent%", content);
    let images = "";
    let files = "";
    if (message.attachments) {
        message.attachments.forEach((v) => {
            if (v.contentType.startsWith("image")) {
                images += `<img class="attachmentImage" src="${v.url}">\n`;
            } else {
                let tempF = fileTemplate;
                tempF.replace("%FileName%", v.name);
                tempF.replace(
                    "%FileSize%",
                    `${Math.floor((v.size / 1000) * 10) / 10}MB`
                );
                tempF.replace("%FileURL%", v.url);
                files += tempF + "\n";
            }
        });
    }
    let embeds = "";
    if (message.embeds.length) {
        message.embeds.forEach((e) => {
            embeds += `<div class="embed"><div class="embedContent"><div class="embedContentMain">`;
            if (e.author) {
                embeds += `<div class="embedAuthor"><img class="embedAuthorAvatar" src="${e.author.iconURL}"><div class="embedAuthorName">${e.author.name}</div></div>`;
            }
            if (e.title) {
                embeds += `<div class="embedTitle">${e.url ? `<a class="noDeco">${e.title}</a>` : e.title}</div>`;
            }
            if (e.description) {
                let desc = e.description
                desc.replace(
                    /<@[0-9]{17-20}>/,
                    `<span class="highlight">@${
                        message.guild.members.cache.get("$&").user.username
                    }</span>`
                );
                desc.replace(
                    /<#[0-9]{17-20}>/,
                    `<span class="highlight">#${
                        message.guild.channels.cache.get("$&").name
                    }</span>`
                );
                desc.replace(
                    /\|\|.+\|\|/,
                    `<span class="spoiler">${"$&".slice(2, -2)}</span>`
                );
                desc.replace(
                    /\*\*.+\*\*/,
                    `<span class="bold">${"$&".slice(2, -2)}</span>`
                );
                desc.replace(
                    /~~.+~~/,
                    `<span class="strike">${"$&".slice(2, -2)}</span>`
                );
                desc.replace('\n', '<br>')
                embeds += `<div class='embedDesc'>${desc}</div>`;
            }
            if (e.fields) {
                let inline = [];
                e.fields.forEach((f) => {
                    if (f.inline) {
                        inline.push(inline);
                    } else {
                        embeds += `<div class="embedRegField"><div class="embedFieldTitle">${f.name}</div><div class="embedFieldValue">${f.value}</div></div>`;
                    }
                });
                embeds += "</div>";
                if (inline.length) {
                    embeds += '<div class="embedInlineFieldHolder">';
                    embeds += inline.forEach((f) => {
                        embeds += `<div class="embedInlineField"><div class="embedFieldTitle">${f.name}</div><div class="embedFieldValue">${f.value}</div></div>`;
                    });
                    embeds += "</div>";
                }
            }
            if (e.image) {
                embeds += `<img class="embedImage" src="${e.image.url}"`;
            }
            if (e.footer) {
                embeds += `<div class="embedFooter"><img class="embedFooterImage" src="${
                    e.footer.iconURL
                }"><div class="embedFooterText">${e.footer.text}${
                    e.timestamp
                        ? `<span style="color: rgba(255, 255, 255, 0.4);"> • </span>${e.timestamp.toLocaleString(
                              locale || "en-US"
                          )}`
                        : ""
                }</div></div>`;
            }
            embeds += "</div>";
            if (e.thumbnail)
                [
                    (embeds += `<img class="embedThumbnail" src="${e.thumbnail.url}">`),
                ];
            embeds += "</div></div>";
        });
    }
    temp.replace("%Embeds%", embeds);
    temp.replace("%Images%", images);
    temp.replace("%Files%", files);
    return temp;
};
