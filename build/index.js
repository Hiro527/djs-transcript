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
exports.transcript = void 0;
const discord_js_1 = require("discord.js");
const uuid_1 = require("uuid");
const path = __importStar(require("path"));
const fs = __importStar(require("fs/promises"));
const GenerateHTML_1 = require("./lib/GenerateHTML");
const transcript = async (client, channel, fpath, locale) => {
    if (!(channel instanceof discord_js_1.TextChannel || channel instanceof discord_js_1.NewsChannel))
        return;
    if (!channel.lastMessage) {
        throw Error(`The channel you specified has no messages to transcript.`);
    }
    const fname = path.join(fpath, `${(0, uuid_1.v4)()}.html`);
    const recursive = async (id, messages) => {
        const result = await channel.messages.fetch({ before: id, limit: 100 });
        messages.push(...result.values());
        messages.sort((a, b) => {
            return BigInt(a.id) > BigInt(b.id) ? 1 : -1;
        });
        if (result.values.length < 100) {
            return messages;
        }
        else {
            recursive(messages[0].id, messages);
        }
    };
    const messages = await recursive(channel.lastMessageId, [channel.lastMessage]);
    const html = await (0, GenerateHTML_1.getHtml)(messages, channel, channel.guild, locale);
    await fs.writeFile(fname, html);
    return fname;
};
exports.transcript = transcript;
