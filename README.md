# show-time

Watch episodes of your favorite TV shows with a simple CLI, using http://showrss.info

**Required: Node ≥ 6**

**New: Browse and Movie modes**

## Main features

* Shows and plays **latest episode** from your own showrss feed, or **movies** from usual torrent providers
* **Browse mode**: if you don't want to bother creating your showrss feed, want to discover a new serie or watch older episodes, this mode will list all available shows, then all available episodes, enjoy!
* **Download mode**: only download episodes (run multiple instances of this the days before your long train trip)
* **Offline mode**: browse and watch previously downloaded episodes (during your long train trip)

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
  --browse         Browse mode
  --movie          Movie mode

Valid players: chromecast, vlc, airplay, mplayer, smplayer, mpchc, potplayer, mpv, omx, webplay, jack
```

### Known bugs

* Peerflix seems to not be working with node 5.x, using 4.x for now
* It happens castnow fails to start, I quit and restart a few seconds/minutes later and it works again

## How it works

* ``show-time`` grabs your RSS feed from showrss.info to show a list of recently available episodes
* It will then search on opensubtitles.org for subtitles (results cached for 1 hour)
* Once the torrent magnet and the subtitles grabbed, it runs ``peerflix`` to download and play video

## Special modes

### Download mode

Option ``--download`` is an alias to ``--no-player --port=0 --peer-port=0``:

* ``--no-player`` disable playing video once ready
* ``--port=0`` and ``--peer-port=0`` sets Peerflix's bound ports to 0, which means arbitrary defined by operating system

Binding arbitrary free ports and not playing video means you can run the command as many times as you want.

### Offline mode

In offline mode, show-time will only fetch information already in cache:

* You select an episode amongst those already (even partially) previously downloaded
* You can use downloaded subtitles, but won't download new ones
* Video is played immediately

This mode works particularly fine with download mode: run ``show-time --download`` to fetch a full episode, then once disconnected run ``show-time --offline`` and here you go :)

### Browse mode

show-time will ignore your feed (previously configured or not) and fetch all available shows from showrss.info:

* Search amongst the shows to select the one you want to see (just type to filter)
* Specific feed is used to liste available episodes for this show only
* That's all folks
* Lazy? If cache was enabled, your previously selected shows will appear first in the list

All other options (cache, download…) will apply, except `--offline` which is obviously incompatible. If cache is enabled, video will be stored in usual place and will be accessible from Offline mode like any other.

### Movie mode

show-time will ignore your feed (previously configured or not) and display a search box for movies:

* Search by title with YTS API (more to come, and sorry for the weird results their engine looks buggy, like 'Doctor St' will return nothing but 'Doctor S' and 'Doctor Strange' will work)
* Then select quality, subtitles, usual stuff…
* If cache is enabled it will simply be stored amongst your TV shows

All other options (cache, download…) will apply, except `--offline` which is obviously incompatible. If cache is enabled, video will be stored in usual place and will be accessible from Offline mode like any other.

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
