const config = {
	divider: '\n---',
};
const reducers = [
[
function avatar (u) {
	return u.avatar ? ' ![avatar][]' : '';
},
function fullName (u) {
	return u.fullName ? ` ${u.fullName}` : '';
},
function heading (u, [avatar, fullName]) {
	return (avatar || fullName) ? `\n#${avatar}${fullName}\n${config.divider}` : '';
}
],
[
function title (u) {
	return u.title ? `\n> #### ${u.title}` : '';
},
[
function location (u) {
	return u.location ? ` ${u.location}` : '';
},
function homepage (u) {
	return u.homepage ? ` &emsp; [${utils.prettyUrl(u.homepage)}][homepage]` : '';
},
function twitter (u) {
	return u.twitter ? ` &emsp; [@${u.twitter.replace(/^@/, '')}][twitter]` : '';
},
function shortDetails (u, [location, homepage, twitter]) {
	return (location || homepage || twitter) ? `\n> ##### ${location}${homepage}${twitter}` : '';
}
],
function tech (u) {
	var tech = utils.techList(u.tech);
	return tech ? `\n> ${tech}` : '';
},
function introBox (u, [title, shortDetails, tech]) {
	return (title || shortDetails || tech) ? `\n${title}${shortDetails}${tech}\n${config.divider}` : '';
}
],
function about (u) {
	if (!u.about) return '';
	var about = utils.blockQuote(u.about, '**"**');
	return `\n${about}\n\n${config.divider}`;
},
function experience (u) {
	var experienceList = utils.mapExpOrEdToMD(u.experience);
	return experienceList ? `\n## Experience${experienceList}` : '';
},
function education (u) {
	var educationList = utils.mapExpOrEdToMD(u.education);
	return educationList ? `\n## Education${educationList}` : '';
},
function oss (u) {
	var ossList = u.projects && u.projects.map(function (p) {
		var url = utils.formatUrl(p.url);
		var title = p.title ? (url ? ` [${p.title}](${url})` : ` ${p.title}`) : '';
		var info = {};
		if (!p.desc || !popularity) {
			info = utils.getProjectInfo(p);
		}
		var popularity = p.popularity || info.popularity;
		popularity = popularity ? ` &emsp; *<small>${popularity}</small>*` : '';

		var heading = (title || popularity) ? `####${title}${popularity}` : '';

		var desc = p.desc || info.desc;
		desc = desc ? `\n${desc}\n${config.divider}` : '';

		return (heading || desc) ? `\n${heading}${desc}` : '';
	}).join('');

	return ossList ? `\n## Open Source${ossList}` : '';
},
[
function writingHabits (u) {
	return u.writingHabits ? `\n> ${u.writingHabits}` : '';
},
function writingsList (u) {
	return (u.writing && Array.isArray(u.writing)) ? u.writing.map(function (w) {
		var url = utils.formatUrl(w.url);
		var title = w.title ? (w.url ? ` [${w.title}](${url}) *<small>@${utils.prettyUrl(url)}</small>*` : ` ${w.title}`) : '';
		return title ? `\n####${title}` : '';
	}).join('') : '';
},
function writings (u, [writingHabits, writingsList]) {
	return (writingHabits || writingsList) ? `\n## Writing\n${writingHabits}${writingsList}\n${config.divider}` : '';
}
],
function favorites (u) {
	var favHeading = '## Favorites';
	var editor = u.editor ? `\n#### Editor\n${u.editor}` : '';
	var os = u.os ? `\n#### Operating System\n${u.os}` : '';
	var term = u.terminal ? `\n#### Terminal\n${u.terminal}` : '';
	return (editor || os || term) ? `\n${favHeading}${editor}${os}${term}\n${config.divider}` : '';
},
function args (u) {
	var avatarArg = u.avatar ? `[avatar]: ${utils.formatUrl(u.avatar)}` : '';
	var twitIco = '\n[twit]: http://cdn-careers.sstatic.net/careers/Img/icon-twitter.png?v=b1bd58ad2034';
	var homepageArg = u.homepage ? `\n[homepage]: ${utils.formatUrl(u.homepage)}` : '';
	var twitterArg = u.twitter ? `\n[twitter]: https://twitter.com/${u.twitter.replace(/^@/, '')}${twitIco}` : '';
	return `\n${avatarArg}${homepageArg}${twitterArg}`;
},
function finish (u, everythingTillNow) {
	return everythingTillNow.join('');
}
];

renderer = function(profile, reducers) {
	const stack = reducers.reduce(function (total, reducer) {
		let val;
		if (Array.isArray(reducer)) {
			val = renderer(profile, reducer);
		} else if (typeof reducer !== 'function') {
			throw new Error('invalid reducer type');
		} else {
			val = reducer(profile, total);
		}
		total.push(val);
		return total;
	}, []);
	return stack[stack.length - 1];
}

var utils = {
	mapExpOrEdToMD (list) {
		if (!list || !list.map) return;
		return list.map(e => { // .n
			if (!e) return '';
			var title = e.title ? ` ${e.title}` : ''; // .n.1.1
			var timeframe = (e.since || e.till) ? ` &emsp; <small>*${utils.timeframe(e.since, e.till)}*</small>` : ''; // .n.1.2
			var heading = (title || timeframe) ? `####${title}${timeframe}` : ''; // .n.1

			var techList = utils.techList(e.tech);
			techList = techList ? `\n${techList}` : ''; // .n.2

			var about = utils.blockQuote(e.about);
			about = about ? `\n${about}` : ''; // .n.3

			return (heading || techList || about) ? `\n${heading}${techList}${about}\n${config.divider}` : ''; // .n
		}).join('');
	},
	formatUrl(url) {
		// TODO: make this a bit more intelligent?
		if (!url) return '';
		if (!url.startsWith('http://') && !url.startsWith('https://') && !url.startsWith('//')) {
			return `http://${url}`;
		}
		return url;
	},
	blockQuote(p, firstQuote) {
		return p ? p.split('\n').map(function (el, i) {
			if (i === 0 && firstQuote) {
				return `> ${firstQuote} ${el}`;
			}
			return `> ${el}`;
		}).join('\n') : '';
	},
	prettyUrl(url) {
		// TODO: remove all trailing part and keep only domain
		return url ? url.replace(/^https?:\/\//, '') : '';
	},
	techList(p) {
		return p ? p.split(/,\s+/g).map(el => `\`${el}\``).join(', ') : '';
	},
	getProjectInfo(wow) {
		return {
			desc: '',
			popularity: ''
		};
	},
	timeframe(since, till) {
		if (since || till) {
			if (since && !till) {
				return `${since} - current`;
			}
			if (!since) {
				return 'current';
			}
			return `${since} - ${till}`;
		}
		return '';
	},
	downloadFromData(data, type, filename) {
		var blob = new Blob([data], {type});
		var url = URL.createObjectURL(blob);
		var a = document.createElement('a');
		a.download = filename;
		a.href = url;
		a.classList.add('hidden');
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
		setTimeout(() => URL.revokeObjectURL(url), 0);
	}
};

Meteor.methods({
	resumeOperation( op, argument ) {
		check( op, String);
		check( argument, Object );
		try {
			if (op === 'remove'){
				return Resume.remove( argument );
			}
			if (op === 'update'){
				return Resume.update({_id: argument._id},{$set: argument.body} );
			}
			return Resume.insert( argument );
		} catch( exception ) {
			throw exception;
		}
	},
	resumeUpdate(body){
		check(body, Object);
		body.markdown = renderer(body,reducers);
		console.log(body);
		if (Resume.findOne()){
			return Resume.update({_id: Resume.findOne()._id},{$set:body});
		} else {
			return Resume.insert(body);
		}
	}
});
