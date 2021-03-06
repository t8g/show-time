# show-time

Watch episodes of your favorite TV shows with a simple CLI, using http://showrss.info

**Required: Node ≥ 4.0**

**NEW (1.5.0): Offline Mode**

## Installation

```sh
npm install -g show-time
```

## Configuration

* Register at [ShowRSS](http://showrss.info) (just a login/password, no mail or real name)
* Configure your feed, just follow the steps on the website
* Run ``show-time --configure`` to initialize your configuration

## Usage

```sh
show-time
```

* Select your episode, subtitles, and enjoy :)

### Demo

![](https://github.com/naholyr/show-time/raw/master/screencast.gif)

### CLI options

```
  --version, -v    Show version and exit
  --help, -h       Show this help and exit
  --clear-cache    Clears cache and exit
  --configure      Configuration wizard
  --config <file>  Use alternative configuration file
  --cache <path>   Path to cache (--no-cache to disable)
  --player <name>  Automatically play to given player
  --feed <url>     ShowRSS feed URL
  --lang <lang>    Preferred language for subtitles
  --download       Download mode
  --offline        Offline mode

Valid players: chromecast, vlc, airplay, mplayer, smplayer, mpchc, potplayer, mpv, omx, webplay, jack
```

### Known bugs

* Peerflix seems to not be working with node 5.x, using 4.x for now
* It happens castnow fails to start, I quit and restart a few seconds/minutes later and it works again

## How it works

* ``show-time`` grabs your RSS feed from showrss.info to show a list of recently available episodes
* It will then search on opensubtitles.org for subtitles (results cached for 1 hour)
* Once the torrent magnet and the subtitles grabbed, it runs ``peerflix`` to download and play video

## Download mode

Option ``--download`` is an alias to ``--no-player --port=0 --peer-port=0``:

* ``--no-player`` disable playing video once ready
* ``--port=0`` and ``--peer-port=0`` sets Peerflix's bound ports to 0, which means arbitrary defined by operating system

Binding arbitrary free ports and not playing video means you can run the command as many times as you want.

## Offline mode

In offline mode, show-time will only fetch information already in cache:

* You select an episode amongst those already (even partially) previously downloaded
* You can use downloaded subtitles, but won't download new ones
* Video is played immediately

This mode works particularly fine with download mode: run ``show-time --download`` to fetch a full episode, then once disconnected run ``show-time --offline`` and here you go :)

## The cache

A lot of things are put in the cache, which is located at ``$HOME/.show-time/cache``:

* The downloaded torrents
* OpenSubtitles results (.json)
* Subtitles (.srt)

You can remove files manually, or you can empty the whole cache with ``show-time --clear-cache``

## Roadmap

* [x] Add configuration options (done since 1.0)
* [x] Add support for chromecast (done since 1.3)
* [x] Add ``--offline`` to allow playing video from cache and not downloading anything more
* [ ] Make ``--download`` more powerful: run in background, no output…
* [ ] Add ``--exit`` to quit once download is complete (use --on-downloaded peerflix option to touch a file we fs.watchFile in current instance)
