async function generateCard() {
    fetch('/youtube')
        .then((resp) => resp.json())
        .then((data) => {
            for (const video of data) {
                const article = document.createElement('article');
                const header = document.createElement('header');
                const videoTopic = document.createElement('p');
                const thumbnailDiv = document.createElement('div');
                const imageLink = document.createElement('a');
                const videoImage = document.createElement('img');
                const videoTitle = document.createElement('p');
                const speakerSection = document.createElement('div');
                const speakerLink = document.createElement('a');
                const speakerImage = document.createElement('img');
                const speakerSVG = document.createElement('svg');
                const speakerName = document.createElement('div');
                const fileDownload = document.createElement('div');

                article.setAttribute('class', 'card');
                header.setAttribute('class', 'card-header')
                videoTopic.setAttribute('class', 'video-topic');
                thumbnailDiv.setAttribute('class', 'thumbnail');
                videoImage.setAttribute('class', 'thumbnail-image');
                videoTitle.setAttribute('class', 'video-title');

                speakerSection.setAttribute('class', 'card-speaker');
                speakerLink.setAttribute('class', 'speaker-avatar');
                speakerSVG.setAttribute('class', 'half-circle');
                speakerName.setAttribute('class', 'speaker-name');
                fileDownload.setAttribute('class', 'download-sikum');

                //header section
                titleArray = (video.title).split(/[|,-]+/);
                videoTopic.innerText = titleArray[0];
                header.appendChild(videoTopic);
                //thumbnail section
                videoImage.setAttribute('src', video.imageLink); // the image itself
                imageLink.setAttribute('href', "https://www.youtube.com/watch?v=" + video.videoId); //link to video
                //close header section
                imageLink.appendChild(videoImage);
                thumbnailDiv.appendChild(imageLink);
                header.appendChild(thumbnailDiv);
                article.appendChild(header);

                //speaker section
                let prefix = titleArray[titleArray.length - 1].split(" ");
                let fullName = prefix.slice(2, prefix.length).join(" ");
                //image section
                speakerImage.setAttribute('src', "/images/IMG_9207.jpg"); //change to real images in future
                speakerLink.setAttribute('href', `/${prefix.join('_')}}`) //will give the page with the speaker's videos
                speakerLink.appendChild(speakerImage);
                speakerSection.appendChild(speakerLink);
                //svg section
                speakerSVG.setAttribute('viewBox', "0 0 106 57");
                speakerSVG.setAttribute('class', "half-circle");
                speakerSVG.innerHTML = `
                <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                   `;
                speakerSection.appendChild(speakerSVG);
                //name section
                speakerName.innerHTML = `<div class="speaker-name-prefix">${prefix[1]}</div>${fullName}`;
                speakerSection.appendChild(speakerName);
                article.appendChild(speakerSection);
                // //final
                document.getElementById("card-list content").appendChild(article);
            }
        });
}
window.onload = async () => {
    generateCard();
};
