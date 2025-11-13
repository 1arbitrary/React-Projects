import { useEffect, useState, type ChangeEvent } from "react";

export default function Main() {
	type Text = {
		topText: string;
		bottomText: string;
		imageUrl: string;
	}

	type Link = {
		url: string;
	}

	const [meme, setMeme] = useState<Text>({
		topText: "One Does Not Simply",
		bottomText: "Walk Into Mordor",
		imageUrl: "http://i.imgflip.com/1bij.jpg"
	});

	const [allMemes, setAllMemes] = useState<Link[]>([]);

	useEffect(() => {
		fetch("https://api.imgflip.com/get_memes")
			.then(res => res.json())
			.then(data => setAllMemes(data.data.memes));
	}, []);

	function getMemeImage(): void {
		const randomNum = Math.floor(Math.random() * allMemes.length);
		setMeme(prev => { return { ...prev, imageUrl: allMemes[randomNum].url } });
	}

	function handleChange(event: ChangeEvent<HTMLInputElement>): void {
		const { name, value } = event.currentTarget;
		setMeme(prev => ({ ...prev, [name]: value }));
	}

	return (
		<main>
			<div className="form">
				<label>Top Text
					<input
						type="text"
						name="topText"
						onChange={handleChange}
						value={meme.topText}
					/>
				</label>

				<label>Bottom Text
					<input
						type="text"
						name="bottomText"
						onChange={handleChange}
						value={meme.bottomText}
					/>
				</label>
				<button onClick={getMemeImage}>Get a new meme image 🖼</button>
			</div>
			<div className="meme">
				<img src={meme.imageUrl} />
				<span className="top">{meme.topText}</span>
				<span className="bottom">{meme.bottomText}</span>
			</div>
		</main>
	)
}
