import { spotifyGetAuthorizationUrl } from '$lib/helpers/spotify';
import { redirect, type Actions } from '@sveltejs/kit';
import Soundcloud from 'soundcloud-scraper';
import fs from 'fs';
export const actions: Actions = {
	spotify: async () => {
		throw redirect(302, spotifyGetAuthorizationUrl());
	},
	soundcloud: async () => {
		const sc = new Soundcloud.Client();
		const song = await sc.getSongInfo(
			'https://soundcloud.com/xrmaniwuzaccheretho/lil-uzi-vert-how-to-talk-pluggnb-remix_xrmani-ripwarheart'
		);
		const stream = await song.downloadProgressive();
		const writer = stream.pipe(fs.createWriteStream(`./${song.title}.mp3`));
		writer.on('finish', () => {
			console.log('Finished writing song!');
		});
	},
	youtubemusic: async () => {
		console.log('hit youtube music');
	}
};
