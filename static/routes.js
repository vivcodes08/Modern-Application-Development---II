import Dashboard from "./components/Dashboard.js"
import Login from "./components/Login.js"
import Register from "./components/Register.js"
import CreatorSpace from "./components/Creator/CreatorSpace.js"
import SongDetails from "./components/SongDetails.js"
import UserProfile from "./components/UserProfile.js"
import Song from "./components/Creator/Song.js"
import Album from "./components/Creator/Album.js"
import UserSpace from "./components/User/UserSpace.js"
import Playlist from "./components/User/Playlist.js"
import MyPlaylists from "./components/User/MyPlaylists.js"
import LikedSongs from "./components/User/LikedSongs.js"
import SongsInPlaylist from "./components/User/SongsInPlaylist.js"
import MySongs from "./components/Creator/MySongs.js"
import MyAlbums from "./components/Creator/MyAlbums.js"
import SongsInAlbums from "./components/Creator/SongsInAlbums.js"
import EditPlaylist from "./components/User/EditPlaylist.js"
import EditAlbum from "./components/Creator/EditAlbum.js"
import EditSong from "./components/Creator/EditSong.js"
import AdminSpace from "./components/Admin/AdminSpace.js"
import AllSongs from "./components/Admin/AllSongs.js"
import AllAlbums from "./components/Admin/AllAlbums.js"
import EditAllAlbums from "./components/Admin/EditAllAlbums.js"
import AllSongsInAlbum from "./components/Admin/AllSongsInAlbum.js"

const routes=[
  {
    path:'/',
    component:Login
  },
  {
    path:'/login',
    component:Login
  },
  {
    path:'/register',
    component:Register
  },
  {
    path:'/dashboard',
    component:Dashboard
  },
  {
    path:'/creator',
    component:CreatorSpace
  },
  {
    path:'/admin',
    component:AdminSpace
  },
  {
    path:'/admin/allsongs',
    component:AllSongs
  },
  {
    path:'/admin/allalbums',
    component:AllAlbums
  },
  {
    path:'/creator/mysongs',
    component:MySongs
  },
  {
    path:'/user',
    component:UserSpace
  },
  {
    path:'/song/:id',
    component:SongDetails
  },
  {
    path:'/myprofile',
    component:UserProfile
  },
  {
    path:'/creator/song',
    component:Song
  },
  {
    path:'/creator/album',
    component:Album
  },
  {
    path:'/creator/myalbums',
    component: MyAlbums
  },
  {
    path:'/user/playlist',
    component:Playlist
  },
  {
    path:'/user/myplaylists',
    component:MyPlaylists
  },
  {
    path:'/user/likedSongs',
    component:LikedSongs
  },
  {
    path:'/playlist/songs/:id',
    component:SongsInPlaylist
  },
  {
    path:'/songs/album/:id',
    component:SongsInAlbums
  },
  {
    path:'/admin/songs/album/:id',
    component:AllSongsInAlbum
  },
  {
    path:'/edit/playlists/:id',
    component:EditPlaylist
  },
  {
    path:'/edit/albums/:id',
    component:EditAlbum
  },
  {
    path:'/admin/edit/albums/:id',
    component:EditAllAlbums
  },
  {
    path:'/edit/song/:id',
    component:EditSong
  }
]

export default routes