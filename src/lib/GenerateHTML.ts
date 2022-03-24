import {
    Guild,
    Message,
    NewsChannel,
    TextBasedChannel,
    TextChannel,
} from "discord.js";
import * as consts from "./consts";
export const getHtml = async (
    messages: Message[],
    channel: TextChannel | NewsChannel,
    guild: Guild,
    locale?: string
) => {
    let BaseHTML = consts.Base;
    // ベースHTMLの構築
    BaseHTML.replace("%SERVER%", guild.name);
    BaseHTML.replace("%CHANNEL_NAME%", channel.name);
    BaseHTML.replace("%SERVER_ICON%", guild.iconURL()!);
    BaseHTML.replace(
        "%TRANSCRIPT_TIMESTAMP%",
        new Date().toLocaleString(locale || "en")
    );
    let ContentsHTML = "";
    messages.forEach((message) => {
        let MessageHTML = consts.Message;
        MessageHTML.replace(
            "%MEMBER_AVATAR%",
            message.member?.displayAvatarURL()!
        );
        MessageHTML.replace("%MEMBER_TAG%", message.member?.user.tag!);
        MessageHTML.replace(
            "%MESSAGE_CREATED_TIMESTAMP%",
            message.createdAt.toLocaleString(locale || "en")
        );
        if (message.editedAt) {
            MessageHTML.replace(
                "%MESSAGE_EDITED_TIMESTAMP%",
                ` Edited at ${message.editedAt.toLocaleString(locale || "en")}`
            );
        } else {
            MessageHTML.replace("%MESSAGE_EDITED_TIMESTAMP%", "");
        }
        MessageHTML.replace(
            "%MESSAGE_CONTENT%",
            generateContentHTML(guild, message.content, false)
        );
        ContentsHTML += MessageHTML;
        let Files = "";
        let Images = "";
        message.attachments.forEach((attachment) => {
            if (attachment.contentType?.startsWith("image")) {
                Images += consts.Image.replace("%IMAGE_URL%", attachment.url);
            } else {
                Files += consts.File.replace("%FILE_NAME%", attachment.name!)
                    .replace(
                        "%FILE_SIZE%",
                        `${
                            Math.floor((attachment.size / 1000 / 1000) * 10) /
                            10
                        }MB`
                    )
                    .replace("%FILE_URL%", attachment.url);
            }
        });
    });
    BaseHTML.replace("%CONTENTS%", ContentsHTML);
    return BaseHTML;
};

const generateContentHTML = (
    guild: Guild,
    content: string,
    embed?: Boolean
) => {
    content.match(/<@[0-9]{17,19}>/g)?.forEach((str) => {
        content.replace(
            str,
            `<span class="highlight">@${
                guild.members.cache.get("$&")?.displayName
            }</span>`
        );
    });
    content.match(/<#[0-9]{17,19}>/g)?.forEach((str) => {
        content.replace(
            str,
            `<span class="highlight">${
                guild.channels.cache.get("$&")?.type === "GUILD_VOICE"
                    ? "🔊"
                    : "#"
            }${guild.channels.cache.get("$&")?.name}</span>`
        );
    });
    content.match(/\*\*\.+\*\*/g)?.forEach((str) => {
        content.replace(str, `<span class="bold">${str.slice(2, -2)}</span>`);
    });
    content.match(/\|\|.+\|\|/g)?.forEach((str) => {
        content.replace(
            str,
            `<span class="spoiler">${str.slice(2, -2)}</span>`
        );
    });
    content.match(/~~.+~~/g)?.forEach((str) => {
        content.replace(str, `<span class="strike">${str.slice(2, -2)}</span>`);
    });
    content.match(/`.+`/g)?.forEach((str) => {
        content.replace(str, `<span class="codeL">${str.slice(1, -1)}</span>`);
    });
    content.match(/```.+```/g)?.forEach((str) => {
        content.replace(str, `<span class="codeB">${str.slice(3, -3)}</span>`);
    });
    content.replaceAll("\n", "<br>");
    return content;
};
