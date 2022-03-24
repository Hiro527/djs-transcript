"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHtml = void 0;
const consts = __importStar(require("./consts"));
const getHtml = async (messages, channel, guild, locale) => {
    let BaseHTML = consts.Base;
    // ベースHTMLの構築
    BaseHTML.replace("%SERVER%", guild.name);
    BaseHTML.replace("%CHANNEL_NAME%", channel.name);
    BaseHTML.replace("%SERVER_ICON%", guild.iconURL());
    BaseHTML.replace("%TRANSCRIPT_TIMESTAMP%", new Date().toLocaleString(locale || "en"));
    let ContentsHTML = "";
    messages.forEach((message) => {
        let MessageHTML = consts.Message;
        MessageHTML.replace("%MEMBER_AVATAR%", message.member?.displayAvatarURL());
        MessageHTML.replace("%MEMBER_TAG%", message.member?.user.tag);
        MessageHTML.replace("%MESSAGE_CREATED_TIMESTAMP%", message.createdAt.toLocaleString(locale || "en"));
        if (message.editedAt) {
            MessageHTML.replace("%MESSAGE_EDITED_TIMESTAMP%", ` Edited at ${message.editedAt.toLocaleString(locale || "en")}`);
        }
        else {
            MessageHTML.replace("%MESSAGE_EDITED_TIMESTAMP%", "");
        }
        MessageHTML.replace("%MESSAGE_CONTENT%", generateContentHTML(guild, message.content, false));
        ContentsHTML += MessageHTML;
    });
    return BaseHTML;
};
exports.getHtml = getHtml;
const generateContentHTML = (guild, content, embed) => {
    content.match(/<@[0-9]{17,19}>/g)?.forEach((str) => {
        content.replace(str, `<span class="highlight">@${guild.members.cache.get("$&")?.displayName}</span>`);
    });
    content.match(/<#[0-9]{17,19}>/g)?.forEach((str) => {
        content.replace(str, `<span class="highlight">${guild.channels.cache.get("$&")?.type === "GUILD_VOICE"
            ? "🔊"
            : "#"}${guild.channels.cache.get("$&")?.name}</span>`);
    });
    content.match(/\*\*\.+\*\*/g)?.forEach((str) => {
        content.replace(str, `<span class="bold">${str.slice(2, -2)}</span>`);
    });
    content.match(/\|\|.+\|\|/g)?.forEach((str) => {
        content.replace(str, `<span class="spoiler">${str.slice(2, -2)}</span>`);
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
    content.replaceAll('\n', '<br>');
    return content;
};
