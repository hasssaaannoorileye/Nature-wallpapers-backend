const express = require('express')
const router = express.Router()

function paginatedResults(model) {
    return async (req, res, next) => {
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        const results = {}

        if (endIndex < model.length) {
            results.next = page + 1
        }
        
        if (startIndex > 0) {
            results.previousPage = page - 1
        }

        try {
            results.results = model.slice(startIndex, endIndex)//await model.find().limit(limit).skip(endIndex).exec()
            res.paginatedResults = results
            next()
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

const wallpapers = [
  {
    "thumbUrl": "https://i.pinimg.com/564x/53/f4/90/53f4903a066ea1c190f113bafb751b4d.jpg",
    "fullUrl": "https://i.pinimg.com/originals/53/f4/90/53f4903a066ea1c190f113bafb751b4d.jpg",
    "pageUrl": "https://in.pinterest.com/pin/566116615676793849/",
    "tags": "allah quotes dark black wall islamic wallpaper",
    "description": "allah is watching you black wallpaper latest islamic"
  },
  {
    "thumbUrl": "https://i.pinimg.com/564x/4b/66/fc/4b66fce8ba909f0d7d7572180e6932e3.jpg",
    "fullUrl": "https://i.pinimg.com/originals/4b/66/fc/4b66fce8ba909f0d7d7572180e6932e3.jpg",
    "pageUrl": "https://in.pinterest.com/pin/351912464899140/",
    "tags": "quran verses black wallpaper quotes dark islamic",
    "description": "dark wallpaper latest quotes islamic"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/21/00/fe/2100fe914ebefe6c1dff063dbf2117ad.jpg",
    "fullUrl": "https://i.pinimg.com/originals/21/00/fe/2100fe914ebefe6c1dff063dbf2117ad.jpg",
    "pageUrl": "https://in.pinterest.com/pin/57139489015519981/",
    "tags": "dark islamic wallpaper quran ",
    "description": "sujud islamic wallpaper latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/3d/1d/3e/3d1d3e9a8ff4906e7a64c60f22ec827b.jpg",
    "fullUrl": "https://i.pinimg.com/originals/3d/1d/3e/3d1d3e9a8ff4906e7a64c60f22ec827b.jpg",
    "pageUrl": "https://in.pinterest.com/pin/55732114131663100/",
    "tags": "tree night islamic dark wallpaper",
    "description": "latest dark wallpaper azkar thikr athkar"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/8e/a8/98/8ea898efcf62090061cde56253465378.jpg",
    "fullUrl": "https://i.pinimg.com/originals/8e/a8/98/8ea898efcf62090061cde56253465378.jpg",
    "pageUrl": "https://in.pinterest.com/pin/207587864068582633/",
    "tags": "quran verses dark black wallpaper heart love red",
    "description": "quran verses dark black wallpaper heart love red lates"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/62/b3/05/62b305e77340175df1e616c2ee4077d4.jpg",
    "fullUrl": "https://i.pinimg.com/originals/62/b3/05/62b305e77340175df1e616c2ee4077d4.jpg",
    "pageUrl": "https://in.pinterest.com/pin/28640147623210134/",
    "tags": "allah wallpaper quotes yellow dark black popular",
    "description": "allah wallpaper quotes yellow dark black popular"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/2c/07/cb/2c07cbcca077dfbcfef95e54083de4d9.jpg",
    "fullUrl": "https://i.pinimg.com/originals/2c/07/cb/2c07cbcca077dfbcfef95e54083de4d9.jpg",
    "pageUrl": "https://in.pinterest.com/pin/104005072655901852/",
    "tags": "yellow islamic wallpaper allah popular",
    "description": "yellow islamic wallpaper allah popular"
  },
  {
    "thumbUrl": "https://i.pinimg.com/564x/7d/ba/5d/7dba5d001470c2aa49f6663b99e50409.jpg",
    "fullUrl": "https://i.pinimg.com/originals/7d/ba/5d/7dba5d001470c2aa49f6663b99e50409.jpg",
    "pageUrl": "https://in.pinterest.com/pin/200621358393337226/",
    "tags": "allah islamic wallpaper popular leaf leaves drop",
    "description": "allah islamic wallpaper popular leaf leaves drop"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/10/9e/b9/109eb91b428d21d93ea5635cae99b800.jpg",
    "fullUrl": "https://i.pinimg.com/originals/10/9e/b9/109eb91b428d21d93ea5635cae99b800.jpg",
    "pageUrl": "https://in.pinterest.com/pin/25403185392082679/",
    "tags": "mosque islamic wallpaper latest",
    "description": "mosque islamic wallpaper latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/d0/c6/13/d0c613fd17dfd965989da8b06aa31ded.jpg",
    "fullUrl": "https://i.pinimg.com/originals/d0/c6/13/d0c613fd17dfd965989da8b06aa31ded.png",
    "pageUrl": "https://in.pinterest.com/pin/35747390785685772/",
    "tags": "mosque islamic wallpaper latest",
    "description": "mosque islamic wallpaper latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/8d/08/95/8d089566e68dad7a39e5d8a07d7312a0.jpg",
    "fullUrl": "https://i.pinimg.com/originals/8d/08/95/8d089566e68dad7a39e5d8a07d7312a0.jpg",
    "pageUrl": "https://in.pinterest.com/pin/8444318044919514/",
    "tags": "mosque islamic wallpaper latest dusk",
    "description": "mosque islamic wallpaper latest dusk"
  },
  {
    "thumbUrl": "https://i.pinimg.com/564x/7a/3a/7c/7a3a7ca33bf094eee63a4ba18cfbf700.jpg",
    "fullUrl": "https://i.pinimg.com/originals/7a/3a/7c/7a3a7ca33bf094eee63a4ba18cfbf700.jpg",
    "pageUrl": "https://in.pinterest.com/pin/1829656092366983/",
    "tags": "hijab woman",
    "description": "hijab woman"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/f0/39/e2/f039e2dea2e077d0890cfabfc5c41320.jpg",
    "fullUrl": "https://i.pinimg.com/originals/f0/39/e2/f039e2dea2e077d0890cfabfc5c41320.jpg",
    "pageUrl": "https://in.pinterest.com/pin/19703317112189626/",
    "tags": "hijab woman",
    "description": "hijab woman"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/e5/15/4f/e5154f9113a7e048d6f2d0d13757ef71.jpg",
    "fullUrl": "https://i.pinimg.com/originals/e5/15/4f/e5154f9113a7e048d6f2d0d13757ef71.jpg",
    "pageUrl": "https://in.pinterest.com/pin/6825836927924209/",
    "tags": "hijab woman flowers",
    "description": "hijab woman flowers"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/b0/5e/f1/b05ef18d92194facb5f62f91c61a16a7.jpg",
    "fullUrl": "https://i.pinimg.com/originals/b0/5e/f1/b05ef18d92194facb5f62f91c61a16a7.jpg",
    "pageUrl": "https://in.pinterest.com/pin/115404809193189867/",
    "tags": "minimal dark islamic wallpaper quotes quran verses",
    "description": "minimal dark islamic wallpaper quotes quran verses"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/57/f5/f4/57f5f4ecc48f6c176042c9c821038b36.jpg",
    "fullUrl": "https://i.pinimg.com/originals/57/f5/f4/57f5f4ecc48f6c176042c9c821038b36.jpg",
    "pageUrl": "https://in.pinterest.com/pin/633387440851924/",
    "tags": "cartoon hijab minimal",
    "description": "cartoon hijab minimal"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/03/72/10/0372105ac3eaab444b828a755345e2ca.jpg",
    "fullUrl": "https://i.pinimg.com/originals/03/72/10/0372105ac3eaab444b828a755345e2ca.jpg",
    "pageUrl": "https://in.pinterest.com/pin/200621358391014261/",
    "tags": "HD phone wallpaper islamic filter",
    "description": "HD phone wallpaper islamic filter"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/6f/b4/11/6fb411c86b015bcdaa8492c3350a089f.jpg",
    "fullUrl": "https://i.pinimg.com/originals/6f/b4/11/6fb411c86b015bcdaa8492c3350a089f.jpg",
    "pageUrl": "https://in.pinterest.com/pin/45950858690647108/",
    "tags": "HD phone wallpaper islamic filter allah",
    "description": "HD phone wallpaper islamic filter allah black"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c7/95/ae/c795ae5a12c3eb2223a25d9f38c958df.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c7/95/ae/c795ae5a12c3eb2223a25d9f38c958df.jpg",
    "pageUrl": "https://in.pinterest.com/pin/184788390954662593/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter black gold black"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/a3/7b/84/a37b84d48e5a4e36d6d42ba587a2d8b6.jpg",
    "fullUrl": "https://i.pinimg.com/originals/a3/7b/84/a37b84d48e5a4e36d6d42ba587a2d8b6.jpg",
    "pageUrl": "https://in.pinterest.com/pin/131730357843438735/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic black filter"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/ed/4b/2e/ed4b2e1af893a9e6675aa68a88891751.jpg",
    "fullUrl": "https://i.pinimg.com/originals/ed/4b/2e/ed4b2e1af893a9e6675aa68a88891751.jpg",
    "pageUrl": "https://in.pinterest.com/pin/68679963059738069/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter allah black "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/d0/b4/20/d0b4207858bfc4b3b6d45d6cf3c118b9.jpg",
    "fullUrl": "https://i.pinimg.com/originals/d0/b4/20/d0b4207858bfc4b3b6d45d6cf3c118b9.jpg",
    "pageUrl": "https://in.pinterest.com/pin/222646775316167709/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic black filter allah"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/24/c8/1f/24c81f553cfaab9cb34629538246bd03.jpg",
    "fullUrl": "https://i.pinimg.com/originals/24/c8/1f/24c81f553cfaab9cb34629538246bd03.jpg",
    "pageUrl": "https://in.pinterest.com/pin/6966574417726276/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic mohamed prophet filter black"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/66/b0/d7/66b0d7e8dff5488708a3aa151f455538.jpg",
    "fullUrl": "https://i.pinimg.com/originals/66/b0/d7/66b0d7e8dff5488708a3aa151f455538.jpg",
    "pageUrl": "https://in.pinterest.com/pin/29625310042197980/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic quotes black"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/55/8b/10/558b10acef1ed206bfb6bcf8b44d8ca4.jpg",
    "fullUrl": "https://i.pinimg.com/originals/55/8b/10/558b10acef1ed206bfb6bcf8b44d8ca4.jpg",
    "pageUrl": "https://in.pinterest.com/pin/705305991664923691/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic mohamed prophet black filter"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/66/86/fc/6686fce2e3e77acfe8b46a733816746a.jpg",
    "fullUrl": "https://i.pinimg.com/originals/66/86/fc/6686fce2e3e77acfe8b46a733816746a.jpg",
    "pageUrl": "https://in.pinterest.com/pin/298926494029535708/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter prophet mohamed"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c1/24/56/c12456cde560fe6afd37d064a952edf0.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c1/24/56/c12456cde560fe6afd37d064a952edf0.jpg",
    "pageUrl": "https://in.pinterest.com/pin/755056693799190176/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic popular"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c9/9e/59/c99e594227c6a1fbb8ff0acabdafc76a.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c9/9e/59/c99e594227c6a1fbb8ff0acabdafc76a.jpg",
    "pageUrl": "https://in.pinterest.com/pin/268175352804174104/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic black filter"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/71/86/37/718637b5a525ac4e78748bf8aea07a75.jpg",
    "fullUrl": "https://i.pinimg.com/originals/71/86/37/718637b5a525ac4e78748bf8aea07a75.jpg",
    "pageUrl": "https://in.pinterest.com/pin/302656037471659556/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic athkar latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/36/5d/c5/365dc56ca592ee676072d94bb0847962.jpg",
    "fullUrl": "https://i.pinimg.com/originals/36/5d/c5/365dc56ca592ee676072d94bb0847962.jpg",
    "pageUrl": "https://in.pinterest.com/pin/4714774601546601/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/cc/6e/5b/cc6e5b6d628e7d0ea1e8f68b4fcf96df.jpg",
    "fullUrl": "https://i.pinimg.com/originals/cc/6e/5b/cc6e5b6d628e7d0ea1e8f68b4fcf96df.jpg",
    "pageUrl": "https://in.pinterest.com/pin/353673377003302797/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest athkar"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/82/7f/c9/827fc9baa234853337cd819da22618d7.jpg",
    "fullUrl": "https://i.pinimg.com/originals/82/7f/c9/827fc9baa234853337cd819da22618d7.jpg",
    "pageUrl": "https://in.pinterest.com/pin/198158452347557362/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest quotes"
  },
  {
    "thumbUrl": "https://i.pinimg.com/564x/7a/b5/f7/7ab5f732ab73c32f42c8c344718f5475.jpg",
    "fullUrl": "https://i.pinimg.com/564x/7a/b5/f7/7ab5f732ab73c32f42c8c344718f5475.jpg",
    "pageUrl": "https://in.pinterest.com/pin/60869032455114488/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/de/66/69/de6669ada5ffe419b07be8647fb74d6f.jpg",
    "fullUrl": "https://i.pinimg.com/originals/de/66/69/de6669ada5ffe419b07be8647fb74d6f.jpg",
    "pageUrl": "https://in.pinterest.com/pin/294774738123863388/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest quotes"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/6d/d8/fa/6dd8fa7fa3fc4ac29d3b181dae9d0718.jpg",
    "fullUrl": "https://i.pinimg.com/originals/6d/d8/fa/6dd8fa7fa3fc4ac29d3b181dae9d0718.jpg",
    "pageUrl": "https://in.pinterest.com/pin/633387436352713/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter black"
  },
  {
    "thumbUrl": "https://i.pinimg.com/564x/bd/d9/d0/bdd9d020783a99fd8a34398175d348e2.jpg",
    "fullUrl": "https://i.pinimg.com/564x/bd/d9/d0/bdd9d020783a99fd8a34398175d348e2.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gpvgv",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter black qoutes" 
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/de/69/57/de6957a1ddfd4d907bb6d077370da4e2.jpg",
    "fullUrl": "https://i.pinimg.com/originals/de/69/57/de6957a1ddfd4d907bb6d077370da4e2.jpg",
    "pageUrl": "https://in.pinterest.com/pin/134967320075761633/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/564x/c7/bd/3e/c7bd3e850e4bfbe7d2f8f8bd9d151fec.jpg",
    "fullUrl": "https://i.pinimg.com/564x/c7/bd/3e/c7bd3e850e4bfbe7d2f8f8bd9d151fec.jpg",
    "pageUrl": "https://in.pinterest.com/pin/370632244347216184/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic quotes"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/05/9a/96/059a9652ada8ed49cf0cdf7b8869e7a6.jpg",
    "fullUrl": "https://i.pinimg.com/originals/05/9a/96/059a9652ada8ed49cf0cdf7b8869e7a6.jpg",
    "pageUrl": "https://in.pinterest.com/pin/319755642307424723/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest quotes"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/66/08/c2/6608c2e649e2568ea809c1fac2a50011.jpg",
    "fullUrl": "https://i.pinimg.com/originals/66/08/c2/6608c2e649e2568ea809c1fac2a50011.jpg",
    "pageUrl": "https://in.pinterest.com/pin/176344141652142851/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest quotes"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/0d/ce/1d/0dce1dd6475204e257c9d0422c4b5cb1.jpg",
    "fullUrl": "https://i.pinimg.com/originals/0d/ce/1d/0dce1dd6475204e257c9d0422c4b5cb1.jpg",
    "pageUrl": "https://in.pinterest.com/pin/176344141652142850/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/65/b7/09/65b70908ac664a3392ad2258092c82fa.jpg",
    "fullUrl": "https://i.pinimg.com/originals/65/b7/09/65b70908ac664a3392ad2258092c82fa.jpg",
    "pageUrl": "https://in.pinterest.com/pin/170081323420608649/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c9/38/9d/c9389d9e919e584935a2853a3900741a.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c9/38/9d/c9389d9e919e584935a2853a3900741a.jpg",
    "pageUrl": "https://in.pinterest.com/pin/2322237295065204/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter quotes"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/cc/9f/7c/cc9f7cfb0d9c5aab33c9ea616c10f9fd.jpg",
    "fullUrl": "https://i.pinimg.com/originals/cc/9f/7c/cc9f7cfb0d9c5aab33c9ea616c10f9fd.jpg",
    "pageUrl": "https://in.pinterest.com/pin/115052965474284059/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/62/9a/d1/629ad1840cd0d35c7a7fa811c56cd80f.jpg",
    "fullUrl": "https://i.pinimg.com/originals/62/9a/d1/629ad1840cd0d35c7a7fa811c56cd80f.jpg",
    "pageUrl": "https://in.pinterest.com/pin/9218374227138560/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c0/2b/e2/c02be211da1c5dd97cec8c3409c91264.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c0/2b/e2/c02be211da1c5dd97cec8c3409c91264.jpg",
    "pageUrl": "https://in.pinterest.com/pin/3025924742226364/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/20/00/ef/2000efa0e43cab0133f70684f82231df.jpg",
    "fullUrl": "https://i.pinimg.com/originals/20/00/ef/2000efa0e43cab0133f70684f82231df.jpg",
    "pageUrl": "https://in.pinterest.com/pin/312578030405853133/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/d7/d6/9d/d7d69dfb43a591e6171004a78d81c130.jpg",
    "fullUrl": "https://i.pinimg.com/originals/d7/d6/9d/d7d69dfb43a591e6171004a78d81c130.jpg",
    "pageUrl": "https://in.pinterest.com/pin/288723026125391579/",
    "tags": "HD phone wallpaper islamic ",
    "description": "HD phone wallpaper islamic filter black"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/6/517/HD-wallpaper-ramadan-kareem-2018-allah-arab-arabic-black-god-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/6/517/HD-wallpaper-ramadan-kareem-2018-allah-arab-arabic-black-god-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kwmwx",
    "tags": "HD phone wallpaper islamic, muslim, latest Ramadan Kareem, 2018, allah, arab, arabic, black, god, islam, muslim",
    "description": "HD phone wallpaper islamic, muslim, latest Ramadan Kareem, 2018, allah, arab, arabic, black, god, islam, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/481/470/HD-wallpaper-durood-black-dark-dua-golden-islam-islamic-muhammad-quran-supplication.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/481/470/HD-wallpaper-durood-black-dark-dua-golden-islam-islamic-muhammad-quran-supplication.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-obsyo",
    "tags": "HD phone wallpaper islamic, muslim, latest Durood, black, dark, dua, golden, islam, islamic, muhammad, quran, supplication",
    "description": "HD phone wallpaper islamic, muslim, latest Durood, black, dark, dua, golden, islam, islamic, muhammad, quran, supplication"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/943/136/HD-wallpaper-ramadan-2017-allah-arab-arabic-black-god-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/943/136/HD-wallpaper-ramadan-2017-allah-arab-arabic-black-god-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjkhn",
    "tags": "HD phone wallpaper islamic, muslim, latest RAMADAN 2017, allah, arab, arabic, black, god, gold, islam, muslim",
    "description": "HD phone wallpaper islamic, muslim, latest RAMADAN 2017, allah, arab, arabic, black, god, gold, islam, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/976/32/HD-wallpaper-mosque-allah-allahu-black-good-hazrat-islam-muhammad-muslim-quran-sw.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/976/32/HD-wallpaper-mosque-allah-allahu-black-good-hazrat-islam-muhammad-muslim-quran-sw.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kukmv",
    "tags": "HD phone wallpaper islamic, muslim, latest mosque, allah, allahu, black, good, hazrat, islam, muhammad, muslim, quran, sw",
    "description": "HD phone wallpaper islamic, muslim, latest mosque, allah, allahu, black, good, hazrat, islam, muhammad, muslim, quran, sw"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/213/739/HD-wallpaper-ramadan-kareem-arabic-typography-black-blue-egypt-galaxy-iphone-islamic-muslim-ramadan-kareem-violet.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/213/739/HD-wallpaper-ramadan-kareem-arabic-typography-black-blue-egypt-galaxy-iphone-islamic-muslim-ramadan-kareem-violet.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ggfsq",
    "tags": "HD phone wallpaper islamic, muslim, Ramadan kareem , arabic typography, black, blue, egypt, galaxy, iphone, islamic, muslim, ramadan kareem, violet ",
    "description": "HD phone wallpaper islamic, muslim, Ramadan kareem , arabic typography, black, blue, egypt, galaxy, iphone, islamic, muslim, ramadan kareem, violet "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/1009/76/HD-wallpaper-allah-3-abstract-black-dark-god-islam-islamic-leather-pakistan-spiritual.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/1009/76/HD-wallpaper-allah-3-abstract-black-dark-god-islam-islamic-leather-pakistan-spiritual.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjarw",
    "tags": "HD phone wallpaper islamic, muslim, latest Allah 3, abstract, black, dark, god, islam, islamic, leather, pakistan, spiritual",
    "description": "HD phone wallpaper islamic, muslim, latest Allah 3, abstract, black, dark, god, islam, islamic, leather, pakistan, spiritual"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/460/145/HD-wallpaper-door-2-allah-black-brown-dark-golden-islam-islamic-pakistan-shade.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/460/145/HD-wallpaper-door-2-allah-black-brown-dark-golden-islam-islamic-pakistan-shade.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fdqxv",
    "tags": "HD phone wallpaper islamic, muslim, latest Door 2, allah, black, brown, dark, golden, islam, islamic, pakistan, shade",
    "description": "HD phone wallpaper islamic, muslim,  Door 2, allah, black, brown, dark, golden, islam, islamic, pakistan, shade"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/711/141/HD-wallpaper-allah-protect-you-black-god-islam-islamic-muslim-nature-stars.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/711/141/HD-wallpaper-allah-protect-you-black-god-islam-islamic-muslim-nature-stars.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ppiqb",
    "tags": "HD phone wallpaper islamic, muslim, latest ALLAH protect you, black, god, islam, islamic, muslim, nature, stars",
    "description": "HD phone wallpaper islamic, muslim, latest ALLAH protect you, black, god, islam, islamic, muslim, nature, stars"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/494/764/HD-wallpaper-allah-alhamdulillah-allah-love-allahuakbar-astaghfirullah-black-islam-muslim-subhanallah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/494/764/HD-wallpaper-allah-alhamdulillah-allah-love-allahuakbar-astaghfirullah-black-islam-muslim-subhanallah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-pcmtn",
    "tags": "HD phone wallpaper islamic, muslim, ALLAH, alhamdulillah, allah love, allahuakbar, astaghfirullah, black, islam, muslim, subhanallah ",
    "description": "HD phone wallpaper islamic, muslim, ALLAH, alhamdulillah, allah love, allahuakbar, astaghfirullah, black, islam, muslim, subhanallah "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/226/708/HD-wallpaper-ramadan-mubarak-dark-islam-roja-typo-world-black.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/226/708/HD-wallpaper-ramadan-mubarak-dark-islam-roja-typo-world-black.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fzwwl",
    "tags": "HD phone wallpaper islamic, muslim, Ramadan Mubarak, dark, Islam, Roja, Typo World, black ",
    "description": "HD phone wallpaper islamic, muslim, Ramadan Mubarak, dark, Islam, Roja, Typo World, black "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/303/24/HD-wallpaper-islamic-girl-black-burqa-muslim-girl.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/303/24/HD-wallpaper-islamic-girl-black-burqa-muslim-girl.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-wfral",
    "tags": "HD phone wallpaper islamic, muslim, Islamic Girl, Black Burqa, muslim girl hijab",
    "description": "HD phone wallpaper islamic, muslim, Islamic Girl, Black Burqa, muslim girl hijab "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/185/482/HD-wallpaper-islamic-background-black-blue-construction-flower-flowers-lotus-pink-plus.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/185/482/HD-wallpaper-islamic-background-black-blue-construction-flower-flowers-lotus-pink-plus.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vxvxw",
    "tags": "HD phone wallpaper islamic, muslim, latest Islamic, background, black, blue, construction, flower, flowers, lotus, pink, plus",
    "description": "HD phone wallpaper islamic, muslim, latest Islamic, background, black, blue, construction, flower, flowers, lotus, pink, plus"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/203/697/HD-wallpaper-islamic-allah-black-doaa-moon-night-stars-white.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/203/697/HD-wallpaper-islamic-allah-black-doaa-moon-night-stars-white.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fyhis",
    "tags": "HD phone wallpaper islamic, muslim, Islamic , allah, black, doaa, moon, night, stars, white ",
    "description": "HD phone wallpaper islamic, muslim, Islamic , allah, black, doaa, moon, night, stars, white "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/524/742/HD-wallpaper-hajj-mubarak-black-eid-iphone-islam-muslims-pakistan-whatsap.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/524/742/HD-wallpaper-hajj-mubarak-black-eid-iphone-islam-muslims-pakistan-whatsap.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-pvrdm",
    "tags": "HD phone wallpaper islamic, muslim, Hajj mubarak, black, eid, iphone, islam, muslims, pakistan, whatsap ",
    "description": "HD phone wallpaper islamic, muslim, Hajj mubarak, black, eid, iphone, islam, muslims, pakistan, whatsap "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/148/888/HD-wallpaper-ramadan-kareem-arabic-black-iphone-muslim-ramadan2021-ramadankareem-typography-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/148/888/HD-wallpaper-ramadan-kareem-arabic-black-iphone-muslim-ramadan2021-ramadankareem-typography-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fizjl",
    "tags": "HD phone wallpaper islamic, muslim, latest ramadan kareem , arabic, black, iphone, muslim, ramadan2021, ramadankareem, typography, islamic ",
    "description": "HD phone wallpaper islamic, muslim, ramadan kareem , arabic, black, iphone, muslim, ramadan2021, ramadankareem, typography, islamic "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/734/339/HD-wallpaper-allah-2018-arab-arabic-black-god-islam-muslim-white.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/734/339/HD-wallpaper-allah-2018-arab-arabic-black-god-islam-muslim-white.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gjswo",
    "tags": "HD phone wallpaper islamic, muslim, Allah, 2018, arab, arabic, black, god, islam, muslim, white ",
    "description": "HD phone wallpaper islamic, muslim, Allah, 2018, arab, arabic, black, god, islam, muslim, white "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/142/183/HD-wallpaper-islam-black-funny-heart-life-love-red-silent-simple-turbo.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/142/183/HD-wallpaper-islam-black-funny-heart-life-love-red-silent-simple-turbo.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nzavw",
    "tags": "HD phone wallpaper islamic, muslim, islam, black, funny, heart, life, love, red, silent, simple, turbo ",
    "description": "HD phone wallpaper islamic, muslim, islam, black, funny, heart, life, love, red, silent, simple, turbo "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/560/12/HD-wallpaper-islam-black-captain-closed-dad-hello-marvel-pirate-pirates-sadness-venom.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/560/12/HD-wallpaper-islam-black-captain-closed-dad-hello-marvel-pirate-pirates-sadness-venom.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gavfg",
    "tags": "HD phone wallpaper islamic, muslim, latest islam, black, captain, closed, dad, hello, marvel, pirate, pirates, sadness, venom",
    "description": "HD phone wallpaper islamic, muslim, latest islam, black, captain, closed, dad, hello, marvel, pirate, pirates, sadness, venom"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/180/681/HD-wallpaper-010-101-0036-anime-black-hijab-hijrah-islam-muslim-muslimah-nikab-ramadan-ramadhan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/180/681/HD-wallpaper-010-101-0036-anime-black-hijab-hijrah-islam-muslim-muslimah-nikab-ramadan-ramadhan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vhnvt",
    "tags": "HD phone wallpaper islamic, muslim, anime, black, hijab, hijrah, islam, muslim, muslimah, nikab, ramadan, ramadhan ",
    "description": "HD phone wallpaper islamic, muslim, anime, black, hijab, hijrah, islam, muslim, muslimah, nikab, ramadan, ramadhan "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/719/715/HD-wallpaper-allah-black-faith-fender-islamic-live-logos-meow-message-panther.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/719/715/HD-wallpaper-allah-black-faith-fender-islamic-live-logos-meow-message-panther.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fksua",
    "tags": "HD phone wallpaper islamic, muslim, Allah, black, faith, fender, islamic, live, logos, meow, message, panther ",
    "description": "HD phone wallpaper islamic, muslim, Allah, black, faith, fender, islamic, live, logos, meow, message, panther "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/67/561/HD-wallpaper-ramadan-mubarak-2018-arab-arabic-black-dark-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/67/561/HD-wallpaper-ramadan-mubarak-2018-arab-arabic-black-dark-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gjqaz",
    "tags": "HD phone wallpaper islamic, muslim, Ramadan Mubarak, 2018, arab, arabic, black, dark, gold, islam, muslim ",
    "description": "HD phone wallpaper islamic, muslim, Ramadan Mubarak, 2018, arab, arabic, black, dark, gold, islam, muslim "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/679/753/HD-wallpaper-islam-islam-name-islam-writting-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/679/753/HD-wallpaper-islam-islam-name-islam-writting-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gpbqi",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/949/249/HD-wallpaper-quran-ayah-islamic-islamic-nofap-quotes-value-wise.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/949/249/HD-wallpaper-quran-ayah-islamic-islamic-nofap-quotes-value-wise.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-phbih",
    "tags": "HD phone wallpaper islamic, muslim, Quran Ayah, islamic, islamic , nofap, quotes, value, wise ",
    "description": "HD phone wallpaper islamic, muslim, Quran Ayah, islamic, islamic , nofap, quotes, value, wise "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/256/740/HD-wallpaper-zikr-and-daily-duaa-arabic-dua-eid-holy-islam-islamic-muslim-religious.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/256/740/HD-wallpaper-zikr-and-daily-duaa-arabic-dua-eid-holy-islam-islamic-muslim-religious.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kpxrs",
    "tags": "HD phone wallpaper islamic, muslim, zikr and daily duaa, arabic, dua, eid, holy, islam, islamic, muslim, religious ",
    "description": "HD phone wallpaper islamic, muslim, zikr and daily duaa, arabic, dua, eid, holy, islam, islamic, muslim, religious "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/550/417/HD-wallpaper-abu-dhabi-mosque-allah-islam-islamic-religion.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/550/417/HD-wallpaper-abu-dhabi-mosque-allah-islam-islamic-religion.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kulgd",
    "tags": "HD phone wallpaper islamic, muslim, Abu Dhabi Mosque, allah, islam, islamic, religion ",
    "description": "HD phone wallpaper islamic, muslim, Abu Dhabi Mosque, allah, islam, islamic, religion popular "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/331/848/HD-wallpaper-ramadan-2020-allah-arab-arabic-islam-islamic-mohammed-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/331/848/HD-wallpaper-ramadan-2020-allah-arab-arabic-islam-islamic-mohammed-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ktido",
    "tags": "HD phone wallpaper islamic, muslim, Ramadan 2020, allah, arab, arabic, islam, islamic, mohammed, muslim ",
    "description": "HD phone wallpaper islamic, muslim, Ramadan 2020, allah, arab, arabic, islam, islamic, mohammed, muslim "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/968/560/HD-wallpaper-ayat-ul-kursi-dua-islamic-surah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/968/560/HD-wallpaper-ayat-ul-kursi-dua-islamic-surah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjzsv",
    "tags": "HD phone wallpaper islamic, muslim, latest Ayat ul kursi, dua, islamic, surah",
    "description": "HD phone wallpaper islamic, muslim, latest Ayat ul kursi, dua, islamic, surah"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/305/715/HD-wallpaper-say-bismi-allah-allah-arab-arabic-high-islam-islamic-lord-muslim-quality-say.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/305/715/HD-wallpaper-say-bismi-allah-allah-arab-arabic-high-islam-islamic-lord-muslim-quality-say.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aqmgu",
    "tags": "HD phone wallpaper islamic, muslim, latestSay Bismi-Allah, allah, arab, arabic, high, islam, islamic, lord, muslim, quality, say ",
    "description": "HD phone wallpaper islamic, muslim, latest Say Bismi-Allah, allah, arab, arabic, high, islam, islamic, lord, muslim, quality, say"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/81/583/HD-wallpaper-mecca-clock-tower-city-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/81/583/HD-wallpaper-mecca-clock-tower-city-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gapvf",
    "tags": "HD phone wallpaper islamic, muslim, Mecca Clock Tower, city, islamic ",
    "description": "HD phone wallpaper islamic, muslim, Mecca Clock Tower, city, islamic popular "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/330/668/HD-wallpaper-subhan-allah-galaxy-islam-islamic-islamic-walpaper-original-walpaper.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/330/668/HD-wallpaper-subhan-allah-galaxy-islam-islamic-islamic-walpaper-original-walpaper.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-opyqf",
    "tags": "HD phone wallpaper islamic, muslim, Subhan Allah, galaxy, islam, islamic, islamic , original ",
    "description": "HD phone wallpaper islamic, muslim, Subhan Allah, galaxy, islam, islamic, islamic , original "
  },
  {
    "thumbUrl": "https://i.pinimg.com/564x/b2/01/34/b201347793b8b3f12cdcabc183574bc8.jpg",
    "fullUrl": "https://i.pinimg.com/564x/b2/01/34/b201347793b8b3f12cdcabc183574bc8.jpg",
    "pageUrl": "https://in.pinterest.com/pin/65654107060861287/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/b7/45/61/b745614fde4cec61f2b11be2cf1da061.jpg",
    "fullUrl": "https://i.pinimg.com/originals/b7/45/61/b745614fde4cec61f2b11be2cf1da061.jpg",
    "pageUrl": "https://in.pinterest.com/pin/365354588535893665/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/89/78/29/89782994767d2ec516f95275303e0427.jpg",
    "fullUrl": "https://i.pinimg.com/originals/89/78/29/89782994767d2ec516f95275303e0427.jpg",
    "pageUrl": "https://in.pinterest.com/pin/188588303139890083/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/67/da/69/67da69d905cf35d223e0144429eb8f31.jpg",
    "fullUrl": "https://i.pinimg.com/originals/67/da/69/67da69d905cf35d223e0144429eb8f31.jpg",
    "pageUrl": "https://in.pinterest.com/pin/355643701844838157/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/8c/78/c6/8c78c6f89324001dc20ae96b1deccaad.jpg",
    "fullUrl": "https://i.pinimg.com/originals/8c/78/c6/8c78c6f89324001dc20ae96b1deccaad.jpg",
    "pageUrl": "https://in.pinterest.com/pin/200621358393068511/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c4/17/c0/c417c026eaa92a3f570a11d5fe73d887.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c4/17/c0/c417c026eaa92a3f570a11d5fe73d887.jpg",
    "pageUrl": "https://in.pinterest.com/pin/17240411067156041/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/47/e6/4f/47e64fb728ef9fabc2def2c6655a2047.jpg",
    "fullUrl": "https://i.pinimg.com/originals/47/e6/4f/47e64fb728ef9fabc2def2c6655a2047.jpg",
    "pageUrl": "https://in.pinterest.com/pin/351912463770632/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c0/4e/ab/c04eab16f56c6aaae68e8a7b77f55ebd.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c0/4e/ab/c04eab16f56c6aaae68e8a7b77f55ebd.jpg",
    "pageUrl": "https://in.pinterest.com/pin/200621358393022275/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/9f/5b/f0/9f5bf09c80d6e8d41df7644b3b8dc63e.jpg",
    "fullUrl": "https://i.pinimg.com/originals/9f/5b/f0/9f5bf09c80d6e8d41df7644b3b8dc63e.jpg",
    "pageUrl": "https://in.pinterest.com/pin/277182552058944025/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/93/bd/00/93bd00a9ff7259fda6f345e18b49b7e8.jpg",
    "fullUrl": "https://i.pinimg.com/originals/93/bd/00/93bd00a9ff7259fda6f345e18b49b7e8.jpg",
    "pageUrl": "https://in.pinterest.com/pin/137922807332335792/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/3e/4b/17/3e4b17c2d028e4639f5ad6056b6f518b.jpg",
    "fullUrl": "https://i.pinimg.com/originals/3e/4b/17/3e4b17c2d028e4639f5ad6056b6f518b.jpg",
    "pageUrl": "https://in.pinterest.com/pin/11329436554530438/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/32/33/f6/3233f6af5cc030d48737bc44478d0e6b.jpg",
    "fullUrl": "https://i.pinimg.com/originals/32/33/f6/3233f6af5cc030d48737bc44478d0e6b.jpg",
    "pageUrl": "https://in.pinterest.com/pin/691795192786349989/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/a7/fa/31/a7fa315ac67b4ba28db8446c6a17ea7c.jpg",
    "fullUrl": "https://i.pinimg.com/originals/a7/fa/31/a7fa315ac67b4ba28db8446c6a17ea7c.jpg",
    "pageUrl": "https://in.pinterest.com/pin/270286415129858129/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/5b/28/17/5b28178f737dd1625d29b0d7aaeff9a2.jpg",
    "fullUrl": "https://i.pinimg.com/originals/5b/28/17/5b28178f737dd1625d29b0d7aaeff9a2.jpg",
    "pageUrl": "https://i.pinimg.com/originals/5b/28/17/5b28178f737dd1625d29b0d7aaeff9a2.jpg",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/76/56/0d/76560dca8579f604aee7e93791f60158.jpg",
    "fullUrl": "https://i.pinimg.com/originals/76/56/0d/76560dca8579f604aee7e93791f60158.jpg",
    "pageUrl": "https://in.pinterest.com/pin/112378953194877800/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/0a/a9/8a/0aa98ae5a241df9f98cad8aa3d115763.jpg",
    "fullUrl": "https://i.pinimg.com/originals/0a/a9/8a/0aa98ae5a241df9f98cad8aa3d115763.jpg",
    "pageUrl": "https://in.pinterest.com/pin/256212666294568651/",
    "tags": "HD phone wallpaper islamic, muslim ",
    "description": "HD phone wallpaper islamic, muslim, popular "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/c1/2d/92/c12d92e198061330b66ceb24ec3f1b17.jpg",
    "fullUrl": "https://i.pinimg.com/originals/c1/2d/92/c12d92e198061330b66ceb24ec3f1b17.jpg",
    "pageUrl": "https://in.pinterest.com/pin/26669822785194434/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, popular "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/9e/aa/4e/9eaa4e1fd9f3588f14a86bdeca4d0948.jpg",
    "fullUrl": "https://i.pinimg.com/originals/9e/aa/4e/9eaa4e1fd9f3588f14a86bdeca4d0948.jpg",
    "pageUrl": "https://in.pinterest.com/pin/9218374227638781/",
    "tags": "HD phone wallpaper islamic, muslim ",
    "description": "HD phone wallpaper islamic, muslim, popular "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/ec/8d/e7/ec8de72500d6bb88998103789cb354d8.jpg",
    "fullUrl": "https://i.pinimg.com/originals/ec/8d/e7/ec8de72500d6bb88998103789cb354d8.jpg",
    "pageUrl": "https://in.pinterest.com/pin/248331366946823940/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/dd/2c/bc/dd2cbcee165b13e34012e61cd6776f81.jpg",
    "fullUrl": "https://i.pinimg.com/originals/dd/2c/bc/dd2cbcee165b13e34012e61cd6776f81.jpg",
    "pageUrl": "https://in.pinterest.com/pin/886364770394599019/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/d7/c0/9c/d7c09cd18b13fb1a7dc70149e752ef39.jpg",
    "fullUrl": "https://i.pinimg.com/originals/d7/c0/9c/d7c09cd18b13fb1a7dc70149e752ef39.jpg",
    "pageUrl": "https://in.pinterest.com/pin/62065301107198771/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/a3/dc/7f/a3dc7f05c0f59d5500e60f037bcae8f6.jpg",
    "fullUrl": "https://i.pinimg.com/originals/a3/dc/7f/a3dc7f05c0f59d5500e60f037bcae8f6.jpg",
    "pageUrl": "https://in.pinterest.com/pin/264797653084339101/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/18/25/55/1825555d0812312f2ccc3cc6472ddebe.jpg",
    "fullUrl": "https://i.pinimg.com/originals/18/25/55/1825555d0812312f2ccc3cc6472ddebe.jpg",
    "pageUrl": "https://in.pinterest.com/pin/328129522866487517/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/8c/46/08/8c46081f6844c8dcb6203821e217fb38.jpg",
    "fullUrl": "https://i.pinimg.com/originals/8c/46/08/8c46081f6844c8dcb6203821e217fb38.jpg",
    "pageUrl": "https://in.pinterest.com/pin/335447872263995975/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/d0/fc/ab/d0fcab163b9f2bda80ac78420d2a9cbf.jpg",
    "fullUrl": "https://i.pinimg.com/originals/d0/fc/ab/d0fcab163b9f2bda80ac78420d2a9cbf.jpg",
    "pageUrl": "https://in.pinterest.com/pin/72268769020293917/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest black"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/90/93/fb/9093fbdacffc38f704571957669cbb00.jpg",
    "fullUrl": "https://i.pinimg.com/originals/90/93/fb/9093fbdacffc38f704571957669cbb00.jpg",
    "pageUrl": "https://in.pinterest.com/pin/519039925812326800/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest black"
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/6b/92/03/6b92030454a3fc49b0f7f67385fa41fb.jpg",
    "fullUrl": "https://i.pinimg.com/originals/6b/92/03/6b92030454a3fc49b0f7f67385fa41fb.jpg",
    "pageUrl": "https://in.pinterest.com/pin/266908715409174570/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/b8/9b/d0/b89bd07210f4fa7bf7bb68e6418958a5.jpg",
    "fullUrl": "https://i.pinimg.com/originals/b8/9b/d0/b89bd07210f4fa7bf7bb68e6418958a5.jpg",
    "pageUrl": "https://in.pinterest.com/pin/156429787049192137/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/85/df/c0/85dfc095690c620c579dc6a3cfbefaa0.jpg",
    "fullUrl": "https://i.pinimg.com/originals/85/df/c0/85dfc095690c620c579dc6a3cfbefaa0.jpg",
    "pageUrl": "https://in.pinterest.com/pin/7740630602669646/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, latest "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/0b/0d/84/0b0d84406abeb130b50f1943842cd176.jpg",
    "fullUrl": "https://i.pinimg.com/originals/0b/0d/84/0b0d84406abeb130b50f1943842cd176.jpg",
    "pageUrl": "https://in.pinterest.com/pin/104005072655901854/",
    "tags": "HD phone wallpaper islamic, muslim, filter ",
    "description": "HD phone wallpaper islamic, muslim, filter "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/37/e7/55/37e75550c28cabcb1efb5a670073962a.jpg",
    "fullUrl": "https://i.pinimg.com/originals/37/e7/55/37e75550c28cabcb1efb5a670073962a.jpg",
    "pageUrl": "https://in.pinterest.com/pin/298926494029620885/",
    "tags": "HD phone wallpaper islamic, muslim, ",
    "description": "HD phone wallpaper islamic, muslim, filter "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/7d/d7/b9/7dd7b9f9daa462a3862b8abac382c1f4.jpg",
    "fullUrl": "https://i.pinimg.com/originals/7d/d7/b9/7dd7b9f9daa462a3862b8abac382c1f4.jpg",
    "pageUrl": "https://in.pinterest.com/pin/268738302756631878/",
    "tags": "HD phone wallpaper islamic, muslim ",
    "description": "HD phone wallpaper islamic, muslim, filter "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/e7/4e/bc/e74ebc6306e49fc32dc7ec5707fcebd1.jpg",
    "fullUrl": "https://i.pinimg.com/originals/e7/4e/bc/e74ebc6306e49fc32dc7ec5707fcebd1.jpg",
    "pageUrl": "https://in.pinterest.com/pin/20969954508691922/",
    "tags": "HD phone wallpaper islamic, muslim ",
    "description": "HD phone wallpaper islamic, muslim, filter "
  },
  {
    "thumbUrl": "https://i.pinimg.com/originals/2d/62/e0/2d62e076bd2948e67afe4286cc2b7bdc.jpg",
    "fullUrl": "https://i.pinimg.com/originals/2d/62/e0/2d62e076bd2948e67afe4286cc2b7bdc.jpg",
    "pageUrl": "https://in.pinterest.com/pin/393924298673242459/",
    "tags": "HD phone wallpaper islamic, muslim, latest ",
    "description": "HD phone wallpaper islamic, muslim, filter "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/132/572/HD-wallpaper-islamic-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/132/572/HD-wallpaper-islamic-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-alrtz",
    "tags": "HD phone wallpaper islamic, muslim",
    "description": "HD phone wallpaper islamic, muslim, latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/417/198/HD-wallpaper-islam-allah-madina-mecca-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/417/198/HD-wallpaper-islam-allah-madina-mecca-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-keulj",
    "tags": "HD phone wallpaper Islam, allah madina, mecca, muslim",
    "description": "HD phone wallpaper Islam, allah madina, mecca, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/898/976/HD-wallpaper-inshallah-allah-highway-islam-islamic-love-road.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/898/976/HD-wallpaper-inshallah-allah-highway-islam-islamic-love-road.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-piqlp",
    "tags": "HD phone wallpaper Inshallah, allah, highway, islam, islamic, love, road",
    "description": "HD phone wallpaper Inshallah, allah, highway, islam, islamic, love, road latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/638/390/HD-wallpaper-quran-quote-islamic-beautiful-islam-motivation-motivational-muslim-saying.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/638/390/HD-wallpaper-quran-quote-islamic-beautiful-islam-motivation-motivational-muslim-saying.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-oifuo",
    "tags": "HD phone wallpaper Quran Quote Islamic, bonito, islam, motivation, motivational, muslim, saying",
    "description": "HD phone wallpaper Quran Quote Islamic, bonito, islam, motivation, motivational, muslim, saying latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/108/289/HD-wallpaper-islamic-durood-prophet-mohammad-pbuh-madinah-islam-islamic-blessings-mosque.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/108/289/HD-wallpaper-islamic-durood-prophet-mohammad-pbuh-madinah-islam-islamic-blessings-mosque.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kpoos",
    "tags": "HD phone wallpaper Islamic, durood, prophet mohammad pbuh, madinah, islam, islamic , blessings, mosque",
    "description": "HD phone wallpaper Islamic, durood, prophet mohammad pbuh, madinah, islam, islamic , blessings, mosque popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/885/630/HD-wallpaper-prophet-mohammad-mohamad-rain-allah-god-islamic-islam-night-athkar-arabic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/885/630/HD-wallpaper-prophet-mohammad-mohamad-rain-allah-god-islamic-islam-night-athkar-arabic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kzbnv",
    "tags": "HD phone wallpaper Prophet mohammad, mohamad, rain, allah, god, islamic, islam, night, athkar, arabic",
    "description": "HD phone wallpaper Prophet mohammad, mohamad, rain, allah, god, islamic, islam, night, athkar, arabic popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/277/227/HD-wallpaper-prophet-mohammad-allah-muslim-islamic-islam-god-rain-glass-arabic-athkar.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/277/227/HD-wallpaper-prophet-mohammad-allah-muslim-islamic-islam-god-rain-glass-arabic-athkar.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-krwru",
    "tags": "HD phone wallpaper Prophet mohammad, allah, muslim, islamic, islam, god, rain, glass, arabic, athkar",
    "description": "HD phone wallpaper Prophet mohammad, allah, muslim, islamic, islam, god, rain, glass, arabic, athkar"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/161/280/HD-wallpaper-allah-2017-arab-arabic-brown-god-gold-islam-muhammad-muslim-prophet.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/161/280/HD-wallpaper-allah-2017-arab-arabic-brown-god-gold-islam-muhammad-muslim-prophet.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kwalh",
    "tags": "HD phone wallpaper Allah, 2017, arab, arabic, brown, god, gold, islam, muhammad, muslim, prophet",
    "description": "HD phone wallpaper Allah, 2017, arab, arabic, brown, god, gold, islam, muhammad, muslim, prophet"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/975/511/HD-wallpaper-prophet-mohammed-allah-athkar-gold-islam-islamic-muslim-prophet-mohamed.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/975/511/HD-wallpaper-prophet-mohammed-allah-athkar-gold-islam-islamic-muslim-prophet-mohamed.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-algoj",
    "tags": "HD phone wallpaper Prophet Mohammed, allah, athkar, gold islam, islamic, muslim, prophet mohamed",
    "description": "HD phone wallpaper Prophet Mohammed, allah, athkar, gold islam, islamic, muslim, prophet mohamed latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/270/322/HD-wallpaper-the-prophet-muhammad-2017-allah-arab-arabic-gold-islam-muslim-red.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/270/322/HD-wallpaper-the-prophet-muhammad-2017-allah-arab-arabic-gold-islam-muslim-red.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nijbz",
    "tags": "HD phone wallpaper The Prophet Muhammad, 2017, allah, arab, arabic, gold, islam, muslim",
    "description": "HD phone wallpaper The Prophet Muhammad, 2017, allah, arab, arabic, gold, islam, muslim latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/891/528/HD-wallpaper-islamic-mosque-sunset.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/891/528/HD-wallpaper-islamic-mosque-sunset.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nzcie",
    "tags": "HD phone wallpaper Islamic mosque, sunset",
    "description": "HD phone wallpaper Islamic mosque, sunset popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/891/332/HD-wallpaper-mosque-al-aqsa-mosque-islam.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/891/332/HD-wallpaper-mosque-al-aqsa-mosque-islam.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-affaz",
    "tags": "HD phone wallpaper Mosque, al aqsa mosque, islam",
    "description": "HD phone wallpaper Mosque, al aqsa mosque, islam popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/401/4/HD-wallpaper-iran-islamic-architecture-mosque.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/401/4/HD-wallpaper-iran-islamic-architecture-mosque.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nxint",
    "tags": "HD phone wallpaper Iran, Islamic architecture, mosque",
    "description": "HD phone wallpaper Iran, Islamic architecture, mosque popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/73/404/HD-wallpaper-the-last-prophet-black-islamic-muhammad-simple.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/73/404/HD-wallpaper-the-last-prophet-black-islamic-muhammad-simple.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ouvng",
    "tags": "HD phone wallpaper The last prophet, black, islamic, muhammad",
    "description": "HD phone wallpaper The last prophet, black, islamic, muhammad black latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/904/483/HD-wallpaper-islamic-kalma-tayab-allah-beautiful-black-golden-islam-muslim-stars.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/904/483/HD-wallpaper-islamic-kalma-tayab-allah-beautiful-black-golden-islam-muslim-stars.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kefit",
    "tags": "HD phone wallpaper Islamic kalma tayab, allah, bonito, black, golden, islam, muslim, stars",
    "description": "HD phone wallpaper Islamic kalma tayab, allah, bonito, black, golden, islam, muslim, stars latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/195/521/HD-wallpaper-bismillah-green-beautiful-black-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/195/521/HD-wallpaper-bismillah-green-beautiful-black-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kywlq",
    "tags": "HD phone wallpaper Bismillah Green, bonito, black, islam, muslim",
    "description": "HD phone wallpaper Bismillah Green, bonito, black, islam, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/4/68/HD-wallpaper-allah-2018-arab-arabic-black-god-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/4/68/HD-wallpaper-allah-2018-arab-arabic-black-god-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nisgl",
    "tags": "HD phone wallpaper Allah, 2018, arab, arabic, black, god, gold, islam, muslim",
    "description": "HD phone wallpaper Allah, 2018, arab, arabic, black, god, gold, islam, muslim latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/357/391/HD-wallpaper-inshaallah-2020-black-inshallah-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/357/391/HD-wallpaper-inshaallah-2020-black-inshallah-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gydff",
    "tags": "HD phone wallpaper InshaAllah, 2020, black, inshallah, islamic",
    "description": "HD phone wallpaper InshaAllah, 2020, black, inshallah, islamic latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/23/898/HD-wallpaper-allah-ar-arab-arabic-black-islam-islamic-logo-muslim-white.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/23/898/HD-wallpaper-allah-ar-arab-arabic-black-islam-islamic-logo-muslim-white.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-guwcj",
    "tags": "HD phone wallpaper Allah, ar, arab, arabic, black, islam, islamic, logo, muslim, white",
    "description": "HD phone wallpaper Allah, ar, arab, arabic, black, islam, islamic, logo, muslim, white"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/653/344/HD-wallpaper-alhamdulillah-alhamdulillah-allah-arabic-black-dark-islamic-ramadan-romjan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/653/344/HD-wallpaper-alhamdulillah-alhamdulillah-allah-arabic-black-dark-islamic-ramadan-romjan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vajhg",
    "tags": "HD phone wallpaper Alhamdulillah , alhamdulillah, allah, arabic, black, dark, , islamic, ramadan, romjan",
    "description": "HD phone wallpaper Alhamdulillah , alhamdulillah, allah, arabic, black, dark, , islamic, ramadan, romjan"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/836/458/HD-wallpaper-islam-black-religi.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/836/458/HD-wallpaper-islam-black-religi.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kdgwk",
    "tags": "HD phone wallpaper Islam, black, religi",
    "description": "HD phone wallpaper Islam, black, religi"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/53/983/HD-wallpaper-masjid-black-evening-islam-islamic-mosque-quran-red-set-sun.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/53/983/HD-wallpaper-masjid-black-evening-islam-islamic-mosque-quran-red-set-sun.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-guzlr",
    "tags": "HD phone wallpaper Masjid, black, evening, islam, islamic, mosque, quran, red, set, sun",
    "description": "HD phone wallpaper Masjid, black, evening, islam, islamic, mosque, quran, red, set, sun"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/590/700/HD-wallpaper-ramadan-kareem-arabic-typography-black-islamic-islamic-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/590/700/HD-wallpaper-ramadan-kareem-arabic-typography-black-islamic-islamic-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gbrfu",
    "tags": "HD phone wallpaper Ramadan kareem, arabic typography, black, islamic, islamic , muslim",
    "description": "HD phone wallpaper Ramadan kareem, arabic typography, black, islamic, islamic , muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/735/623/HD-wallpaper-allah-arab-arabic-black-dark-god-islam-muslim-white.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/735/623/HD-wallpaper-allah-arab-arabic-black-dark-god-islam-muslim-white.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kojcw",
    "tags": "HD phone wallpaper Allah, arab, arabic, black, dark, god, islam, muslim, white",
    "description": "HD phone wallpaper Allah, arab, arabic, black, dark, god, islam, muslim, white"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/335/501/HD-wallpaper-islamic-alah-birds-black-doaa-here-islam-night-pro-white.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/335/501/HD-wallpaper-islamic-alah-birds-black-doaa-here-islam-night-pro-white.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fkmwj",
    "tags": "HD phone wallpaper Islamic , alah, birds, black, doaa, here, islam, night, pro, white",
    "description": "HD phone wallpaper Islamic , alah, birds, black, doaa, here, islam, night, pro, white"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/116/737/HD-wallpaper-alhamdulillah-black-collection-everything-fire-for-islamic-new-wonderful.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/116/737/HD-wallpaper-alhamdulillah-black-collection-everything-fire-for-islamic-new-wonderful.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fqkbw",
    "tags": "HD phone wallpaper Alhamdulillah, black, collection, everything, fire, for, islamic, new, wonderful",
    "description": "HD phone wallpaper Alhamdulillah, black, collection, everything, fire, for, islamic, new, latest wonderful"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/742/424/HD-wallpaper-duaa-allah-black-islam-islamic-muslim-sea-wave.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/742/424/HD-wallpaper-duaa-allah-black-islam-islamic-muslim-sea-wave.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fulhp",
    "tags": "HD phone wallpaper Duaa, allah, black, islam, islamic, muslim, sea, wave",
    "description": "HD phone wallpaper Duaa, allah, black, islam, islamic, muslim, sea, wave popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/249/802/HD-wallpaper-allah-arab-arabic-black-god-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/249/802/HD-wallpaper-allah-arab-arabic-black-god-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ggbrp",
    "tags": "HD phone wallpaper Allah, arab, arabic, black, god, gold, islam, muslim",
    "description": "HD phone wallpaper Allah, arab, arabic, black, god, gold, islam, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/94/288/HD-wallpaper-allah-2018-arab-arabic-black-god-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/94/288/HD-wallpaper-allah-2018-arab-arabic-black-god-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-apzzp",
    "tags": "HD phone wallpaper Allah, 2018, arab, arabic, black, god, gold, islam, muslim",
    "description": "HD phone wallpaper Allah, 2018, arab, arabic, black, god, gold, islam, muslim latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/407/987/HD-wallpaper-allah-is-with-us-black-islamic-peace-words.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/407/987/HD-wallpaper-allah-is-with-us-black-islamic-peace-words.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gokfb",
    "tags": "HD phone wallpaper Allah is with us, black, islamic, peace, words",
    "description": "HD phone wallpaper Allah is with us, black, islamic, peace, words quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/209/989/HD-wallpaper-al-aqsa-al-aqsa-al-quds-black-gold-islamic-jerusalem-masjid-mosque-old-palestine.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/209/989/HD-wallpaper-al-aqsa-al-aqsa-al-quds-black-gold-islamic-jerusalem-masjid-mosque-old-palestine.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-pqmhw",
    "tags": "HD phone wallpaper Al Aqsa , al aqsa, al quds, black, gold, islamic, jerusalem, masjid, mosque, old, palestine",
    "description": "HD phone wallpaper Al Aqsa , al aqsa, al quds, black, gold, islamic, jerusalem, masjid, mosque, old, palestine popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/685/542/HD-wallpaper-alhamdulillah-electric-blue-symbol-islam-black-golden-islamic-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/685/542/HD-wallpaper-alhamdulillah-electric-blue-symbol-islam-black-golden-islamic-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vybvx",
    "tags": "HD phone wallpaper ALHAMDULILLAH, electric blue, symbol, islam, black, golden, Islamic, Muslim",
    "description": "HD phone wallpaper ALHAMDULILLAH, electric blue, symbol, islam, black, golden, Islamic, Muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/26/437/HD-wallpaper-surah-al-ikhlas-2020-arabic-english-islam-languages-muslims-quran-ramadan-world.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/26/437/HD-wallpaper-surah-al-ikhlas-2020-arabic-english-islam-languages-muslims-quran-ramadan-world.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-auvrl",
    "tags": "HD phone wallpaper Surah Al-Ikhlas, 2020, arabic, english, islam, languages, muslims quran, ramadan, world",
    "description": "HD phone wallpaper Surah Al-Ikhlas, 2020, arabic, english, islam, languages, muslims quran, ramadan, world latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/627/182/HD-wallpaper-mecca-clock-tower-islam-kabbah-mecca.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/627/182/HD-wallpaper-mecca-clock-tower-islam-kabbah-mecca.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aoqyg",
    "tags": "HD phone wallpaper Mecca Clock Tower, islam, kabbah, mecca",
    "description": "HD phone wallpaper Mecca Clock Tower, islam, kabbah, mecca popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/417/198/HD-wallpaper-islam-allah-madina-mecca-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/417/198/HD-wallpaper-islam-allah-madina-mecca-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-keulj",
    "tags": "HD phone wallpaper Islam, allah madina, mecca, muslim",
    "description": "HD phone wallpaper Islam, allah madina, mecca, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/390/664/HD-wallpaper-kaaba-f-great-mosque-of-mecca-mecca-q-quality.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/390/664/HD-wallpaper-kaaba-f-great-mosque-of-mecca-mecca-q-quality.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nbxel",
    "tags": "HD phone wallpaper Kaaba f, great mosque of mecca, mecca",
    "description": "HD phone wallpaper Kaaba f, great mosque of mecca, mecca popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/142/351/HD-wallpaper-mecca-islamic-devotional-religious-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/142/351/HD-wallpaper-mecca-islamic-devotional-religious-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kpdfx",
    "tags": "HD phone wallpaper Mecca , islamic, devotional, religious, muslim",
    "description": "HD phone wallpaper Mecca , islamic, devotional, religious, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/374/750/HD-wallpaper-mecca-clock-tower-clock-tower.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/374/750/HD-wallpaper-mecca-clock-tower-clock-tower.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kwmst",
    "tags": "HD phone wallpaper ",
    "description": "HD phone wallpaper Mecca clock tower, clock tower popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/81/583/HD-wallpaper-mecca-clock-tower-city-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/81/583/HD-wallpaper-mecca-clock-tower-city-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gapvf",
    "tags": "HD phone wallpaper Mecca Clock Tower, city, islamic",
    "description": "HD phone wallpaper Mecca Clock Tower, city, islamic popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/205/749/HD-wallpaper-makka-sharif-makka-sharif-kaba-islamic-muslim-mecca-religious.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/205/749/HD-wallpaper-makka-sharif-makka-sharif-kaba-islamic-muslim-mecca-religious.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kplkk",
    "tags": "HD phone wallpaper Makka Sharif , makka sharif, kaba, islamic, muslim, mecca, religious",
    "description": "HD phone wallpaper Makka Sharif , makka sharif, kaba, islamic, muslim, mecca, religious popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/768/899/HD-wallpaper-mecca-allah-bit-love-you.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/768/899/HD-wallpaper-mecca-allah-bit-love-you.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-acpsi",
    "tags": "HD phone wallpaper Mecca, allah, bit, love, you",
    "description": "HD phone wallpaper Mecca, allah, bit, love, you popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/378/892/HD-wallpaper-makkah-hajj-islam-kaaba-kabba-mecca-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/378/892/HD-wallpaper-makkah-hajj-islam-kaaba-kabba-mecca-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ntanw",
    "tags": "HD phone wallpaper makkah, hajj, islam, kaaba, kabba, mecca, muslim",
    "description": "HD phone wallpaper makkah, hajj, islam, kaaba, kabba, mecca, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/796/568/HD-wallpaper-makkah-full-clock-tower-islam-kaaba-kaabah-masjidil-haram-mecca-saudi-arabia.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/796/568/HD-wallpaper-makkah-full-clock-tower-islam-kaaba-kaabah-masjidil-haram-mecca-saudi-arabia.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nhsgg",
    "tags": "HD phone wallpaper Makkah Full, clock tower, islam, kaaba, kaabah, masjidil haram, mecca, saudi arabia",
    "description": "HD phone wallpaper Makkah Full, clock tower, islam, kaaba, kaabah, masjidil haram, mecca, saudi arabia"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/403/570/HD-wallpaper-mecca-clock-tower-hotel-islam-kabba-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/403/570/HD-wallpaper-mecca-clock-tower-hotel-islam-kabba-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ofofl",
    "tags": "HD phone wallpaper Mecca clock tower, hotel, islam, kabba, muslim",
    "description": "HD phone wallpaper Mecca clock tower, hotel, islam, kabba, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/101/318/HD-wallpaper-holy-mecca-allah-islam-mosque-peace-world.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/101/318/HD-wallpaper-holy-mecca-allah-islam-mosque-peace-world.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fxwjm",
    "tags": "HD phone wallpaper Holy Mecca, allah, islam, mosque, peace, world",
    "description": "HD phone wallpaper Holy Mecca, allah, islam, mosque, peace, world"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/273/795/HD-wallpaper-mecca-city-arab-clock-islamic-night-saudi-arabia-tower.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/273/795/HD-wallpaper-mecca-city-arab-clock-islamic-night-saudi-arabia-tower.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjhzw",
    "tags": "HD phone wallpaper Mecca City, arab, clock, islamic, night, saudi arabia, tower",
    "description": "HD phone wallpaper Mecca City, arab, clock, islamic, night, saudi arabia, tower"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/278/617/HD-wallpaper-mecca-azan-haram-islam-islamic-ksa-makkah-meeca-mosque-saudi-arabia.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/278/617/HD-wallpaper-mecca-azan-haram-islam-islamic-ksa-makkah-meeca-mosque-saudi-arabia.jp",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kytkv",
    "tags": "HD phone wallpaper Mecca, azan, haram, islam, islamic, ksa, makkah, meeca, mosque, saudi arabia",
    "description": "HD phone wallpaper Mecca, azan, haram, islam, islamic, ksa, makkah, meeca, mosque, saudi arabia"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/745/813/HD-wallpaper-masjid-al-haram-clock-tower-islam-kaaba-kaabah-makkah-masjidil-haram-mecca-saudi-arabia.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/745/813/HD-wallpaper-masjid-al-haram-clock-tower-islam-kaaba-kaabah-makkah-masjidil-haram-mecca-saudi-arabia.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gvmrg",
    "tags": "HD phone wallpaper Masjid Al Haram, clock tower, islam, kaaba, kaabah, makkah, masjidil haram, mecca, saudi arabia",
    "description": "HD phone wallpaper Masjid Al Haram, clock tower, islam, kaaba, kaabah, makkah, masjidil haram, mecca, saudi arabia"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/380/174/HD-wallpaper-eid-makkah-eiduladha-islam-islamic-eidmubarak-mubarak-labaik-mecca-hajj-madina-muhammad.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/380/174/HD-wallpaper-eid-makkah-eiduladha-islam-islamic-eidmubarak-mubarak-labaik-mecca-hajj-madina-muhammad.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vcaxv",
    "tags": "HD phone wallpaper Eid, makkah, eiduladha, islam, islamic, eidmubarak, mubarak, labaik, mecca, hajj, madina, muhammad",
    "description": "HD phone wallpaper Eid, makkah, eiduladha, islam, islamic, eidmubarak, mubarak, labaik, mecca, hajj, madina, muhammad"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/146/978/HD-wallpaper-hajj-islam-kaba-kabba-makah-makkah-meca-mecca-mulim-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/146/978/HD-wallpaper-hajj-islam-kaba-kabba-makah-makkah-meca-mecca-mulim-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nkfou",
    "tags": "HD phone wallpaper Hajj, islam, kaba, kabba, makah, makkah, meca, mecca, mulim, quran",
    "description": "HD phone wallpaper Hajj, islam, kaba, kabba, makah, makkah, meca, mecca, mulim, quran popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/475/1009/HD-wallpaper-hajj-islam-kaba-kabba-meca-mecca-old-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/475/1009/HD-wallpaper-hajj-islam-kaba-kabba-meca-mecca-old-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ndwjt",
    "tags": "HD phone wallpaper Hajj, islam, kaba, kabba, meca, mecca, old, quran",
    "description": "HD phone wallpaper Hajj, islam, kaba, kabba, meca, mecca, old, quran"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/775/59/HD-wallpaper-hajj-arab-arabic-duaa-islam-kaba-kabba-makkah-meca-mecca.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/775/59/HD-wallpaper-hajj-arab-arabic-duaa-islam-kaba-kabba-makkah-meca-mecca.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-arbak",
    "tags": "HD phone wallpaper hajj, arab, arabic, duaa, islam, kaba, kabba, makkah, meca, mecca",
    "description": "HD phone wallpaper hajj, arab, arabic, duaa, islam, kaba, kabba, makkah, meca, mecca"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/980/752/HD-wallpaper-masjid-mecca-with-stars-background-mecca-stars-background-pilgr.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/980/752/HD-wallpaper-masjid-mecca-with-stars-background-mecca-stars-background-pilgr.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-waoti",
    "tags": "HD phone wallpaper Masjid, Mecca With Stars Background, mecca, stars background, pilgr",
    "description": "HD phone wallpaper Masjid, Mecca With Stars Background, mecca, stars background, pilgr"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/1000/544/HD-wallpaper-religious-masjid-al-haram-mecca-mosques.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/1000/544/HD-wallpaper-religious-masjid-al-haram-mecca-mosques.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-wggml",
    "tags": "HD phone wallpaper Religious, Masjid Al Haram (Mecca), Mosques",
    "description": "HD phone wallpaper Religious, Masjid Al Haram (Mecca), Mosques popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/696/676/HD-wallpaper-islamic-mecca.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/696/676/HD-wallpaper-islamic-mecca.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-wknln",
    "tags": "HD phone wallpaper Islamic , Mecca",
    "description": "HD phone wallpaper Islamic , Mecca Religious, Masjid Al Haram Mosques"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/621/971/HD-wallpaper-moon-clock-makkah-mecca-clock-makkah-y2020y-night-tower-players.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/621/971/HD-wallpaper-moon-clock-makkah-mecca-clock-makkah-y2020y-night-tower-players.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-grqbs",
    "tags": "HD phone wallpaper Moon Clock Makkah, mecca, clock makkah, y2020y, night, tower, players",
    "description": "HD phone wallpaper Moon Clock Makkah, mecca, clock makkah, y2020y, night, tower, players"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/874/345/HD-wallpaper-darood-daroodshareef-makkah-islam-islamic-mecca-jumma-madina-daroodibrahimi-jummahmubarak.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/874/345/HD-wallpaper-darood-daroodshareef-makkah-islam-islamic-mecca-jumma-madina-daroodibrahimi-jummahmubarak.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vlddd",
    "tags": "HD phone wallpaper Darood, daroodshareef, makkah, islam, islamic, mecca, jumma, madina, daroodibrahimi",
    "description": "HD phone wallpaper Darood, daroodshareef, makkah, islam, islamic, mecca, jumma, madina, daroodibrahimi athkar quotes latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/353/445/HD-wallpaper-darood-makkah-mosque-islam-islamic-jumma-madina-daroodibrahimi-masjid-daroodhareef.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/353/445/HD-wallpaper-darood-makkah-mosque-islam-islamic-jumma-madina-daroodibrahimi-masjid-daroodhareef.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vqjkw",
    "tags": "HD phone wallpaper Darood, makkah, mosque, islam, islamic, jumma, madina, daroodibrahimi, masjid, daroodhareef",
    "description": "HD phone wallpaper Darood, makkah, mosque, islam, islamic, jumma, madina, daroodibrahimi, masjid, daroodhareef athkar quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/470/86/HD-wallpaper-darood-masjidnabvi-makkah-islam-islamic-quran-madina-daroodibrahimi-masjid-daroodhareef.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/470/86/HD-wallpaper-darood-masjidnabvi-makkah-islam-islamic-quran-madina-daroodibrahimi-masjid-daroodhareef.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vqmmx",
    "tags": "HD phone wallpaper Darood, masjidnabvi, makkah, islam, islamic, quran, madina, daroodibrahimi, masjid, daroodhareef",
    "description": "HD phone wallpaper Darood, masjidnabvi, makkah, islam, islamic, quran, madina, daroodibrahimi, masjid, daroodhareef athkar quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/628/433/HD-wallpaper-darood-makkah-mosque-islam-islamic-quran-madina-daroodibrahimi-masjid-daroodhareef.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/628/433/HD-wallpaper-darood-makkah-mosque-islam-islamic-quran-madina-daroodibrahimi-masjid-daroodhareef.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vtwla",
    "tags": "HD phone wallpaper Darood, makkah, mosque, islam, islamic, quran, madina, daroodibrahimi, masjid, daroodhareef, ",
    "description": "HD phone wallpaper Darood, makkah, mosque, islam, islamic, quran, madina, daroodibrahimi, masjid, daroodhareef, athkar quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/618/322/HD-wallpaper-madina-madina-munawara-makkah-masjid-muhammad-saw.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/618/322/HD-wallpaper-madina-madina-munawara-makkah-masjid-muhammad-saw.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-alurc",
    "tags": "HD phone wallpaper madina, madina munawara, makkah, masjid, muhammad, saw",
    "description": "HD phone wallpaper madina, madina munawara, makkah, masjid, muhammad, saw popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/1007/927/HD-wallpaper-makkah-madina-masjid-mosque.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/1007/927/HD-wallpaper-makkah-madina-masjid-mosque.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gpvgv",
    "tags": "HD phone wallpaper Makkah Madina, masjid, mosque",
    "description": "HD phone wallpaper Makkah Madina, masjid, mosque"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/371/626/HD-wallpaper-madina-sharif-madina-makkah-masjid-muhammd-roza-rasool.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/371/626/HD-wallpaper-madina-sharif-madina-makkah-masjid-muhammd-roza-rasool.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-onxgr",
    "tags": "HD phone wallpaper MADINA SHARIF, madina, makkah, masjid, muhammd, roza rasool ",
    "description": "HD phone wallpaper MADINA SHARIF, madina, makkah, masjid, muhammd, roza rasool"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/244/140/HD-wallpaper-masjid-madina.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/244/140/HD-wallpaper-masjid-madina.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fxqyy",
    "tags": "HD phone wallpaper ",
    "description": "HD phone wallpaper Masjid, madina popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/98/554/HD-wallpaper-alhamdulillah-everything-wonderful-black-fire-for-islam-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/98/554/HD-wallpaper-alhamdulillah-everything-wonderful-black-fire-for-islam-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-pmouf",
    "tags": "HD phone wallpaper Alhamdulillah, Everything, Wonderful, black, fire, for, islam, islamic",
    "description": "HD phone wallpaper Alhamdulillah, Everything, Wonderful, black, fire, for, islam, islamic latest quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/653/344/HD-wallpaper-alhamdulillah-alhamdulillah-allah-arabic-black-dark-islamic-ramadan-romjan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/653/344/HD-wallpaper-alhamdulillah-alhamdulillah-allah-arabic-black-dark-islamic-ramadan-romjan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vajhg",
    "tags": "HD phone wallpaper Alhamdulillah , alhamdulillah, allah, arabic, black, dark, , islamic, ramadan, romjan",
    "description": "HD phone wallpaper Alhamdulillah , alhamdulillah, allah, arabic, black, dark, , islamic, ramadan, romjan latest quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/817/353/HD-wallpaper-alhamdulillah-allah-iphone-islam-islamic-muslim-nature-sayings.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/817/353/HD-wallpaper-alhamdulillah-allah-iphone-islam-islamic-muslim-nature-sayings.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-peadl",
    "tags": "HD phone wallpaper Alhamdulillah, Allah, iphone, islam, islamic, muslim, nature, sayings",
    "description": "HD phone wallpaper Alhamdulillah, Allah, iphone, islam, islamic, muslim, nature, sayings latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/815/691/HD-wallpaper-alhamdulillah-allah-faizicreation-holy-islam-islamic-love-quotes-words.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/815/691/HD-wallpaper-alhamdulillah-allah-faizicreation-holy-islam-islamic-love-quotes-words.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kekex",
    "tags": "HD phone wallpaper Alhamdulillah, allah, faizicreation, holy, islam, islamic, love, quotes words",
    "description": "HD phone wallpaper Alhamdulillah, allah, faizicreation, holy, islam, islamic, love, quotes words"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/615/282/HD-wallpaper-alhamdulillah-electric-blue-islamic-motivation.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/615/282/HD-wallpaper-alhamdulillah-electric-blue-islamic-motivation.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-eawie",
    "tags": "HD phone wallpaper Alhamdulillah, electric blue, islamic, motivation",
    "description": "HD phone wallpaper Alhamdulillah, electric blue, islamic, motivation"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/200/49/HD-wallpaper-alhamdulillah-black-cute-dark-girl-hijab-islamic-muslim-niqab-peace.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/200/49/HD-wallpaper-alhamdulillah-black-cute-dark-girl-hijab-islamic-muslim-niqab-peace.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kxfnv",
    "tags": "HD phone wallpaper Alhamdulillah , black, cute, dark, girl, hijab, islamic, muslim, niqab, peace",
    "description": "HD phone wallpaper Alhamdulillah , black, cute, dark, girl, hijab, islamic, muslim, niqab, peace hijab"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/825/241/HD-wallpaper-ramadan-kareem-mubarak-holy-islam-islamic-muslim-religious.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/825/241/HD-wallpaper-ramadan-kareem-mubarak-holy-islam-islamic-muslim-religious.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ojitl",
    "tags": "HD phone wallpaper Ramadan Kareem Mubarak, holy, islam, islamic, muslim, religious",
    "description": "HD phone wallpaper Ramadan Kareem Mubarak, holy, islam, islamic, muslim, religious"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/76/919/HD-wallpaper-ramadan-mubarak-arab-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-holiday-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/76/919/HD-wallpaper-ramadan-mubarak-arab-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-holiday-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-arrtu",
    "tags": "HD phone wallpaper Ramadan mubarak, Arab, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, holiday, moon",
    "description": "HD phone wallpaper Ramadan mubarak, Arab, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, holiday, moon popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/296/674/HD-wallpaper-arabic-background-arab-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-holiday-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/296/674/HD-wallpaper-arabic-background-arab-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-holiday-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-faxvj",
    "tags": "HD phone wallpaper Arabic background, Arab, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, holiday, moon",
    "description": "HD phone wallpaper Arabic background, Arab, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, holiday, moon popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/428/738/HD-wallpaper-islamic-golden-blue-arab-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-holiday-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/428/738/HD-wallpaper-islamic-golden-blue-arab-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-holiday-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ohszb",
    "tags": "HD phone wallpaper Islamic golden blue, Arab, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, holiday, moon",
    "description": "HD phone wallpaper Islamic golden blue, Arab, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, holiday, moon popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/320/858/HD-wallpaper-ramadan-mubarak-arab-eid-mubarak-islam-muslim-ramadam-mubarak-ramadam-kareem-happy-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/320/858/HD-wallpaper-ramadan-mubarak-arab-eid-mubarak-islam-muslim-ramadam-mubarak-ramadam-kareem-happy-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fwnty",
    "tags": "HD phone wallpaper Ramadan mubarak, Arab, Eid mubarak, Islam, Muslim, Ramadam Mubarak, Ramadam kareem, happy, moon",
    "description": "HD phone wallpaper Ramadan mubarak, Arab, Eid mubarak, Islam, Muslim, Ramadam Mubarak, Ramadam kareem, happy, moon"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/492/622/HD-wallpaper-eid-festive-lights-arab-eid-mubarak-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/492/622/HD-wallpaper-eid-festive-lights-arab-eid-mubarak-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vovui",
    "tags": "HD phone wallpaper Eid festive lights, Arab, Eid mubarak, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, moon",
    "description": "HD phone wallpaper Eid festive lights, Arab, Eid mubarak, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, moon"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/734/753/HD-wallpaper-ramadan-mubarak-arab-islam-muslim-ramadam-mubarak-ramadam-kareem-happy-holiday-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/734/753/HD-wallpaper-ramadan-mubarak-arab-islam-muslim-ramadam-mubarak-ramadam-kareem-happy-holiday-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fqcpz",
    "tags": "HD phone wallpaper Ramadan mubarak, Arab, Islam, Muslim, Ramadam Mubarak, Ramadam kareem, happy, holiday, moon",
    "description": "HD phone wallpaper Ramadan mubarak, Arab, Islam, Muslim, Ramadam Mubarak, Ramadam kareem, happy, holiday, moon popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/273/210/HD-wallpaper-ramadan-arabic-islam-kareem.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/273/210/HD-wallpaper-ramadan-arabic-islam-kareem.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-azhwt",
    "tags": "HD phone wallpaper Ramadan, arabic, islam, kareem",
    "description": "HD phone wallpaper Ramadan, arabic, islam, kareem"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/170/981/HD-wallpaper-eid-mubarak-arab-islam-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/170/981/HD-wallpaper-eid-mubarak-arab-islam-muslim-ramadam-mubarak-ramadam-kareem-ramadan-happy-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vglvu",
    "tags": "HD phone wallpaper Eid mubarak, Arab, Islam, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, moon",
    "description": "HD phone wallpaper Eid mubarak, Arab, Islam, Muslim, Ramadam Mubarak, Ramadam kareem, Ramadan, happy, moon"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/497/613/HD-wallpaper-the-prophet-muhammad-2017-arab-islam-mohammed-muslim-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/497/613/HD-wallpaper-the-prophet-muhammad-2017-arab-islam-mohammed-muslim-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nwszj",
    "tags": "HD phone wallpaper The Prophet Muhammad, 2017, arab, islam, mohammed, muslim, ramadan",
    "description": "HD phone wallpaper The Prophet Muhammad, 2017, arab, islam, mohammed, muslim, ramadan popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/350/444/HD-wallpaper-eid-mubarak-alfitr-arabic-islamic-laylatul-qadar-muslim-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/350/444/HD-wallpaper-eid-mubarak-alfitr-arabic-islamic-laylatul-qadar-muslim-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nhuru",
    "tags": "HD phone wallpaper Eid Mubarak - AlFitr, arabic islamic, laylatul qadar, muslim, ramadan",
    "description": "HD phone wallpaper Eid Mubarak - AlFitr, arabic islamic, laylatul qadar, muslim, ramadan"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/180/622/HD-wallpaper-ramadan-arab-eid-mubarak-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-happy-moon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/180/622/HD-wallpaper-ramadan-arab-eid-mubarak-islam-mubarak-muslim-ramadam-mubarak-ramadam-kareem-happy-moon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vnhki",
    "tags": "HD phone wallpaper Ramadan, Arab, Eid mubarak, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, happy, moon",
    "description": "HD phone wallpaper Ramadan, Arab, Eid mubarak, Islam, Mubarak, Muslim, Ramadam Mubarak, Ramadam kareem, happy, moon popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/531/355/HD-wallpaper-ramadan-kareem-2017-arab-black-islam-moon-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/531/355/HD-wallpaper-ramadan-kareem-2017-arab-black-islam-moon-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nnpyf",
    "tags": "HD phone wallpaper Ramadan Kareem, 2017, arab, black, islam, moon, muslim",
    "description": "HD phone wallpaper Ramadan Kareem, 2017, arab, black, islam, moon, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/166/164/HD-wallpaper-ramadan-kareem-happy-ramadan-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/166/164/HD-wallpaper-ramadan-kareem-happy-ramadan-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aqsiw",
    "tags": "HD phone wallpaper Ramadan Kareem, happy ramadan, ramadan",
    "description": "HD phone wallpaper Ramadan Kareem, happy ramadan, ramadan popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/983/106/HD-wallpaper-ramadan-kareem-ramdan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/983/106/HD-wallpaper-ramadan-kareem-ramdan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nnolt",
    "tags": "HD phone wallpaper Ramadan Kareem, ramdan",
    "description": "HD phone wallpaper Ramadan Kareem, ramdan"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/790/396/HD-wallpaper-ramadan-kareem-eslam.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/790/396/HD-wallpaper-ramadan-kareem-eslam.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-priol",
    "tags": "HD phone wallpaper Ramadan kareem, eslam",
    "description": "HD phone wallpaper Ramadan kareem, eslam popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/319/561/HD-wallpaper-ramadan-ik-kareem-mubarak-ramazan-ramdan-dark-masjid-moody-moon-mosque-new-night-random-sky-stars.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/319/561/HD-wallpaper-ramadan-ik-kareem-mubarak-ramazan-ramdan-dark-masjid-moody-moon-mosque-new-night-random-sky-stars.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gclcy",
    "tags": "HD phone wallpaper RAMADAN, IK, Kareem, Mubarak, Ramazan, Ramdan, dark, masjid, moody, moon, mosque, new, night, random, sky, stars",
    "description": "HD phone wallpaper RAMADAN, IK, Kareem, Mubarak, Ramazan, Ramdan, dark, masjid, moody, moon, mosque, new, night, random, sky, stars popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/782/670/HD-wallpaper-ramadan-islam-ramadan-kareem.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/782/670/HD-wallpaper-ramadan-islam-ramadan-kareem.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ojoor",
    "tags": "HD phone wallpaper ramadan , islam, ramadan kareem",
    "description": "HD phone wallpaper ramadan , islam, ramadan kareem popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/282/203/HD-wallpaper-ramadan-islam-mosque-ramadan-ramadan-kareem.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/282/203/HD-wallpaper-ramadan-islam-mosque-ramadan-ramadan-kareem.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-opwln",
    "tags": "HD phone wallpaper ramadan , islam, mosque, ramadan, ramadan kareem",
    "description": "HD phone wallpaper ramadan , islam, mosque, ramadan, ramadan kareem latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/944/328/HD-wallpaper-ramadan-kareem-2021-2021-ramadan-holy-festival-islamic-love-muslim-peace-ramadan-respect-together.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/944/328/HD-wallpaper-ramadan-kareem-2021-2021-ramadan-holy-festival-islamic-love-muslim-peace-ramadan-respect-together.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ajemf",
    "tags": "HD phone wallpaper Ramadan Kareem 2021, 2021 ramadan, holy festival, islamic, love, muslim, peace, ramadan, respect, together",
    "description": "HD phone wallpaper Ramadan Kareem 2021, 2021 ramadan, holy festival, islamic, love, muslim, peace, ramadan, respect, together"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/213/739/HD-wallpaper-ramadan-kareem-arabic-typography-black-blue-egypt-galaxy-iphone-islamic-muslim-ramadan-kareem-violet.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/213/739/HD-wallpaper-ramadan-kareem-arabic-typography-black-blue-egypt-galaxy-iphone-islamic-muslim-ramadan-kareem-violet.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ggfsq",
    "tags": "HD phone wallpaper Ramadan kareem , arabic typography, black, blue, egypt, galaxy, iphone, islamic, muslim, ramadan kareem, violet",
    "description": "HD phone wallpaper Ramadan kareem , arabic typography, black, blue, egypt, galaxy, iphone, islamic, muslim, ramadan kareem, violet latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/221/704/HD-wallpaper-ramadan-kareem-arabic-typography-black-black-dark-iphone-islamic-lockscreen-muslim-ramadan-kareem-ramadan-kareem.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/221/704/HD-wallpaper-ramadan-kareem-arabic-typography-black-black-dark-iphone-islamic-lockscreen-muslim-ramadan-kareem-ramadan-kareem.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-oueut",
    "tags": "HD phone wallpaper Ramadan kareem , arabic typography, black, black, dark, iphone, islamic, lockscreen, muslim, ramadan kareem, ramadan kareem",
    "description": "HD phone wallpaper Ramadan kareem , arabic typography, black, black, dark, iphone, islamic, lockscreen, muslim, ramadan kareem, ramadan kareem"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/590/700/HD-wallpaper-ramadan-kareem-arabic-typography-black-islamic-islamic-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/590/700/HD-wallpaper-ramadan-kareem-arabic-typography-black-islamic-islamic-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gbrfu",
    "tags": "HD phone wallpaper Ramadan kareem, arabic typography, black, islamic, islamic , muslim",
    "description": "HD phone wallpaper Ramadan kareem, arabic typography, black, islamic, islamic , muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/244/644/HD-wallpaper-ramadan-kareem-2019-allah-arabic-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/244/644/HD-wallpaper-ramadan-kareem-2019-allah-arabic-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kcgyo",
    "tags": "HD phone wallpaper Ramadan Kareem 2019, allah, arabic, islam, muslim",
    "description": "HD phone wallpaper Ramadan Kareem 2019, allah, arabic, islam, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/331/848/HD-wallpaper-ramadan-2020-allah-arab-arabic-islam-islamic-mohammed-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/331/848/HD-wallpaper-ramadan-2020-allah-arab-arabic-islam-islamic-mohammed-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ktido",
    "tags": "HD phone wallpaper Ramadan 2020, allah, arab, arabic, islam, islamic, mohammed, muslim",
    "description": "HD phone wallpaper Ramadan 2020, allah, arab, arabic, islam, islamic, mohammed, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/477/324/HD-wallpaper-ramadan-mubarak-2018-allah-arab-arabic-black-dark-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/477/324/HD-wallpaper-ramadan-mubarak-2018-allah-arab-arabic-black-dark-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kwhvf",
    "tags": "HD phone wallpaper Ramadan Mubarak, 2018, allah, arab, arabic, black, dark, islam, muslim",
    "description": "HD phone wallpaper Ramadan Mubarak, 2018, allah, arab, arabic, black, dark, islam, muslim latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/790/924/HD-wallpaper-muslim-believer-wp-beautiful-iphone-islam-islamic-life-motivation-motivational-quote-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/790/924/HD-wallpaper-muslim-believer-wp-beautiful-iphone-islam-islamic-life-motivation-motivational-quote-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-owxlx",
    "tags": "HD phone wallpaper Muslim Believer WP, bonito, iphone, islam, islamic, life, motivation, motivational, quote, quran",
    "description": "HD phone wallpaper Muslim Believer WP, bonito, iphone, islam, islamic, life, motivation, motivational, quotes, quran"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/638/390/HD-wallpaper-quran-quote-islamic-beautiful-islam-motivation-motivational-muslim-saying.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/638/390/HD-wallpaper-quran-quote-islamic-beautiful-islam-motivation-motivational-muslim-saying.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-oifuo",
    "tags": "HD phone wallpaper Quran Quote Islamic, bonito, islam, motivation, motivational, muslim, saying",
    "description": "HD phone wallpaper Quran Quotes Islamic, bonito, islam, motivation, motivational, muslim, saying"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/922/947/HD-wallpaper-quran-beautiful-dark-flowers-islamic-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/922/947/HD-wallpaper-quran-beautiful-dark-flowers-islamic-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gwtpd",
    "tags": "HD phone wallpaper Quran, bonito, dark, flowers, islamic, muslim",
    "description": "HD phone wallpaper Quran, bonito, dark, flowers, islamic, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/735/926/HD-wallpaper-islam-love-beautiful-iphone-islamic-life-motivation-motivational-muslim-quote-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/735/926/HD-wallpaper-islam-love-beautiful-iphone-islamic-life-motivation-motivational-muslim-quote-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-frmhb",
    "tags": "HD phone wallpaper Islam Love, bonito, iphone, islamic, life, motivation, motivational, muslim, quote, quran",
    "description": "HD phone wallpaper Islam Love, bonito, iphone, islamic, life, motivation, motivational, muslim, quotes, quran"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/519/291/HD-wallpaper-believe-religion-beautiful-iphone-islam-islamic-life-motivation-motivational-muslim-quote-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/519/291/HD-wallpaper-believe-religion-beautiful-iphone-islam-islamic-life-motivation-motivational-muslim-quote-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fvzxn",
    "tags": "HD phone wallpaper Believe Religion, bonito, iphone, islam, islamic, life, motivation, motivational, muslim, quote, quran",
    "description": "HD phone wallpaper Believe Religion, bonito, iphone, islam, islamic, life, motivation, motivational, muslim, quotes latest, quran"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/394/121/HD-wallpaper-quraan-beautiful-blak-dark-islamic-muslims-quran-red.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/394/121/HD-wallpaper-quraan-beautiful-blak-dark-islamic-muslims-quran-red.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-oqqmk",
    "tags": "HD phone wallpaper Quraan, bonito, blak, dark, islamic, muslims, quran, red",
    "description": "HD phone wallpaper Quraan, bonito, blak, dark, islamic, muslims, quran, red qoutes popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/336/645/HD-wallpaper-quran-arab-arabic-islam-islamic-muslim-essam-simple-thumbnail.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/336/645/HD-wallpaper-quran-arab-arabic-islam-islamic-muslim-essam-simple-thumbnail.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-oatlc",
    "tags": "HD phone wallpaper Quran, arab, arabic, islam, islamic, muslim, essam, simple",
    "description": "HD phone wallpaper Quran, arab, arabic, islam, islamic, muslim, essam, simple quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/93/277/HD-wallpaper-quran-verses-the-verses-of-the-holy.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/93/277/HD-wallpaper-quran-verses-the-verses-of-the-holy.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gaxzm",
    "tags": "HD phone wallpaper Quran Verses, the verses of the holy ",
    "description": "HD phone wallpaper Quran Verses, the verses of the holy"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/688/83/HD-wallpaper-quran-verses-inspiration.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/688/83/HD-wallpaper-quran-verses-inspiration.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kpnol",
    "tags": "HD phone wallpaper Quran , verses, inspiration",
    "description": "HD phone wallpaper Quran , verses, inspiration"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/28/526/HD-wallpaper-quran-verse-quran-verses.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/28/526/HD-wallpaper-quran-verse-quran-verses.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ehsct",
    "tags": "HD phone wallpaper Quran Verse, Quran Verses",
    "description": "HD phone wallpaper Quran Verse, Quran Verses"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/645/623/HD-wallpaper-quran-verses-allah-islam-islamic-death.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/645/623/HD-wallpaper-quran-verses-allah-islam-islamic-death.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vqhiq",
    "tags": "HD phone wallpaper Quran verses, allah, islam, islamic, death",
    "description": "HD phone wallpaper Quran verses, allah, islam, islamic, death latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/17/828/HD-wallpaper-quran-verses.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/17/828/HD-wallpaper-quran-verses.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ehscn",
    "tags": "HD phone wallpaper Quran Verses",
    "description": "HD phone wallpaper Quran Verses"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/410/547/HD-wallpaper-qur-an-verses-%D8%B3%D9%88%D8%B1%D8%A9-%D9%87%D9%88%D8%AF-quran-verses.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/410/547/HD-wallpaper-qur-an-verses-%D8%B3%D9%88%D8%B1%D8%A9-%D9%87%D9%88%D8%AF-quran-verses.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ehscg",
    "tags": "HD phone wallpaper Qur'an Verses (سورة هود), Quran Verses",
    "description": "HD phone wallpaper Qur'an Verses (سورة هود), Quran Verses latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/822/515/HD-wallpaper-quran-phone.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/822/515/HD-wallpaper-quran-phone.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nvwrw",
    "tags": "HD phone wallpaper Quran, phone",
    "description": "HD phone wallpaper Quran, phone latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/336/569/HD-wallpaper-quran-al-yousife-hammato.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/336/569/HD-wallpaper-quran-al-yousife-hammato.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nrand",
    "tags": "HD phone wallpaper Quran, al-yousife, hammato,",
    "description": "HD phone wallpaper Quran, al-yousife, hammato,"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/730/58/HD-wallpaper-masjid-allah-god-holy-islam-mosque-muhammad-quran-rasool.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/730/58/HD-wallpaper-masjid-allah-god-holy-islam-mosque-muhammad-quran-rasool.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-abvca",
    "tags": "HD phone wallpaper Masjid, allah, god, holy, islam, mosque, muhammad, quran, rasool",
    "description": "HD phone wallpaper Masjid, allah, god, holy, islam, mosque, muhammad, quran, rasool popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/904/557/HD-wallpaper-masjid-allah-mosque.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/904/557/HD-wallpaper-masjid-allah-mosque.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kowtw",
    "tags": "HD phone wallpaper masjid, allah, mosque",
    "description": "HD phone wallpaper masjid, allah, mosque popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/774/132/HD-wallpaper-khanna-kaaba-allah-islamic-mosque.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/774/132/HD-wallpaper-khanna-kaaba-allah-islamic-mosque.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-poqzp",
    "tags": "HD phone wallpaper Khanna Kaaba, allah, islamic, mosque",
    "description": "HD phone wallpaper Khanna Kaaba, allah, islamic, mosque popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/43/504/HD-wallpaper-islam-allah-best-islamic-mohamed-mosque-pray-quran-ramadan-turkey.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/43/504/HD-wallpaper-islam-allah-best-islamic-mohamed-mosque-pray-quran-ramadan-turkey.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ggnor",
    "tags": "HD phone wallpaper islam, allah, best, islamic, mohamed, mosque, pray, quran, ramadan, turkey",
    "description": "HD phone wallpaper islam, allah, best, islamic, mohamed, mosque, pray, quran, ramadan, turkey popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/236/728/HD-wallpaper-muslim-praying-islam-islamic-mosque-vector.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/236/728/HD-wallpaper-muslim-praying-islam-islamic-mosque-vector.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gvaac",
    "tags": "HD phone wallpaper Muslim Praying, islam, islamic, mosque, vector",
    "description": "HD phone wallpaper Muslim Praying, islam, islamic, mosque, vector latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/707/353/HD-wallpaper-quran-islamic-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/707/353/HD-wallpaper-quran-islamic-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-guqko",
    "tags": "HD phone wallpaper Quran, islamic, ramadan",
    "description": "HD phone wallpaper Quran, islamic, ramadan"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/1019/925/HD-wallpaper-quran-islamic-ramadan-karim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/1019/925/HD-wallpaper-quran-islamic-ramadan-karim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vgfiq",
    "tags": "HD phone wallpaper quran , islamic, ramadan karim",
    "description": "HD phone wallpaper quran , islamic, ramadan karim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/658/710/HD-wallpaper-ramadan-karim-2016-karim-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/658/710/HD-wallpaper-ramadan-karim-2016-karim-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aewmy",
    "tags": "HD phone wallpaper ramadan karim, 2016, karim, ramadan,",
    "description": "HD phone wallpaper ramadan karim, 2016, karim, ramadan,"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/536/740/HD-wallpaper-allah-call-upon-me-ayah-ayat-islam-kuran-lord-god-merciful-muslim-quran-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/536/740/HD-wallpaper-allah-call-upon-me-ayah-ayat-islam-kuran-lord-god-merciful-muslim-quran-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kycgn",
    "tags": "HD phone wallpaper Allah - Call upon me, ayah, ayat, islam, kuran, lord god, merciful, muslim, quran, ramadan",
    "description": "HD phone wallpaper Allah - Call upon me, ayah, ayat, islam, kuran, lord god, merciful, muslim, quran, ramadan"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/982/398/HD-wallpaper-i-am-muslim-mosque-allah-arabic-islam-islamic-merciful-mosque-mubarak-muslim-quran-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/982/398/HD-wallpaper-i-am-muslim-mosque-allah-arabic-islam-islamic-merciful-mosque-mubarak-muslim-quran-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ndpes",
    "tags": "HD phone wallpaper I AM Muslim-MOSQUE, allah, arabic, islam, islamic, merciful, mosque, mubarak, muslim, quran, ramadan",
    "description": "HD phone wallpaper I AM Muslim-MOSQUE, allah, arabic, islam, islamic, merciful, mosque, mubarak, muslim, quran, ramadan"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/494/684/HD-wallpaper-islam-al-quran-allah-love-muslim-peaceful-thumbnail.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/494/684/HD-wallpaper-islam-al-quran-allah-love-muslim-peaceful-thumbnail.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gkhaq",
    "tags": "HD phone wallpaper Islam , al quran, allah, love, muslim, peaceful,",
    "description": "HD phone wallpaper Islam , al quran, allah, love, muslim, peaceful, latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/507/475/HD-wallpaper-islamic-palace-allah-city-islam-kaaba-mosque-real-revenant-skyline-view-thumbnail.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/507/475/HD-wallpaper-islamic-palace-allah-city-islam-kaaba-mosque-real-revenant-skyline-view-thumbnail.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-agmnf",
    "tags": "HD phone wallpaper Islamic palace, allah, city, islam, kaaba, mosque, real, revenant, skyline, view",
    "description": "HD phone wallpaper Islamic palace, allah, city, islam, kaaba, mosque, real, revenant, skyline, view popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/303/33/HD-wallpaper-allah-akbar-athkar-dini-god-iphone-islam-islamic-mosque-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/303/33/HD-wallpaper-allah-akbar-athkar-dini-god-iphone-islam-islamic-mosque-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nstcg",
    "tags": "HD phone wallpaper ALLAH AKBAR, athkar, dini, god, iphone , islam, islamic, mosque, muslim",
    "description": "HD phone wallpaper ALLAH AKBAR, athkar, dini, god, iphone , islam, islamic, mosque, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/787/20/HD-wallpaper-allah-forgive-me-alhumdulillah-muslim-kaaba-islam.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/787/20/HD-wallpaper-allah-forgive-me-alhumdulillah-muslim-kaaba-islam.jpg",
    "pageUrl": "https://w0.peakpx.com/wallpaper/787/20/HD-wallpaper-allah-forgive-me-alhumdulillah-muslim-kaaba-islam.jpg",
    "tags": "HD phone wallpaper Allah, forgive, me, alhumdulillah, muslim, kaaba, islam",
    "description": "HD phone wallpaper Allah, forgive, me, alhumdulillah, muslim, kaaba, islam popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/510/512/HD-wallpaper-mosque-alhumdulillah-allah-allahu-islam-love-mashaallah-muslim-muslims-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/510/512/HD-wallpaper-mosque-alhumdulillah-allah-allahu-islam-love-mashaallah-muslim-muslims-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gjruh",
    "tags": "HD phone wallpaper mosque, alhumdulillah, allah, allahu, islam, love, mashaallah, muslim, muslims, quran",
    "description": "HD phone wallpaper mosque, alhumdulillah, allah, allahu, islam, love, mashaallah, muslim, muslims, quran popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/616/449/HD-wallpaper-turk-mosque-allah-cami-din-flag-islam-mosque-turk-turkish-turkiye.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/616/449/HD-wallpaper-turk-mosque-allah-cami-din-flag-islam-mosque-turk-turkish-turkiye.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ajjpk",
    "tags": "HD phone wallpaper Turk Mosque, allah, cami, din, flag, islam, mosque, turk, turkish, turkiye, ",
    "description": "HD phone wallpaper Turk Mosque, allah, cami, din, flag, islam, mosque, turk, turkish, turkiye,  popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/124/529/HD-wallpaper-quran-verses-thumbnail.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/124/529/HD-wallpaper-quran-verses-thumbnail.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ehsco",
    "tags": "HD phone wallpaper Quran Verses,",
    "description": "HD phone wallpaper Quran Verses, popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/968/560/HD-wallpaper-ayat-ul-kursi-dua-islamic-surah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/968/560/HD-wallpaper-ayat-ul-kursi-dua-islamic-surah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjzsv",
    "tags": "HD phone wallpaper Ayat ul kursi, dua, islamic, surah",
    "description": "HD phone wallpaper Ayat ul kursi, dua, islamic, surah"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/359/534/HD-wallpaper-smile-is-sunnah-allah-hill-islam-islamic-muslim-tree-white.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/359/534/HD-wallpaper-smile-is-sunnah-allah-hill-islam-islamic-muslim-tree-white.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fttmp",
    "tags": "HD phone wallpaper Smile is Sunnah, allah, hill, islam, islamic, muslim, tree, white",
    "description": "HD phone wallpaper Smile is Sunnah, allah, hill, islam, islamic, muslim, tree, white popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/23/908/HD-wallpaper-mosque-abudhabi-beautiful-islamic-mosque-muslim-uae.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/23/908/HD-wallpaper-mosque-abudhabi-beautiful-islamic-mosque-muslim-uae.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-amxoz",
    "tags": "HD phone wallpaper mosque , abudhabi, beautiful islamic, mosque, muslim, uae",
    "description": "HD phone wallpaper mosque , abudhabi, beautiful islamic, mosque, muslim, uae popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/750/869/HD-wallpaper-alhamdulillah-allah-black-cute-islamic-muslim-nature-thanks-tree-thumbnail.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/750/869/HD-wallpaper-alhamdulillah-allah-black-cute-islamic-muslim-nature-thanks-tree-thumbnail.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kohkq",
    "tags": "HD phone wallpaper Alhamdulillah , allah, black, cute, islamic, muslim, nature, thanks, tree",
    "description": "HD phone wallpaper Alhamdulillah , allah, black, cute, islamic, muslim, nature, thanks, tree latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/133/349/HD-wallpaper-ramadan-2018-arab-arabic-islam-muslim-thumbnail.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/133/349/HD-wallpaper-ramadan-2018-arab-arabic-islam-muslim-thumbnail.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nithb",
    "tags": "HD phone wallpaper Ramadan, 2018, arab, arabic, islam, muslim",
    "description": "HD phone wallpaper Ramadan, 2018, arab, arabic, islam, muslim"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/490/26/HD-wallpaper-alhamd-lilah-allah-arab-arabic-god-islam-islamic-mohammed-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/490/26/HD-wallpaper-alhamd-lilah-allah-arab-arabic-god-islam-islamic-mohammed-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nvbmm",
    "tags": "HD phone wallpaper alhamd lilah, allah, arab, arabic, god, islam, islamic, mohammed, muslim",
    "description": "HD phone wallpaper alhamd lilah, allah, arab, arabic, god, islam, islamic, mohammed, muslim latest quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/481/468/HD-wallpaper-allah-2018-arab-blue-god-islam-muslim-name.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/481/468/HD-wallpaper-allah-2018-arab-blue-god-islam-muslim-name.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gksjc",
    "tags": "HD phone wallpaper Allah, 2018, arab, blue, god, islam, muslim, name",
    "description": "HD phone wallpaper Allah, 2018, arab, blue, god, islam, muslim, name popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/305/715/HD-wallpaper-say-bismi-allah-allah-arab-arabic-high-islam-islamic-lord-muslim-quality-say.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/305/715/HD-wallpaper-say-bismi-allah-allah-arab-arabic-high-islam-islamic-lord-muslim-quality-say.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aqmgu",
    "tags": "HD phone wallpaper Say Bismi-Allah, allah, arab, arabic, high, islam, islamic, lord, muslim, quality",
    "description": "HD phone wallpaper Say Bismi-Allah, allah, arab, arabic, high, islam, islamic, lord, muslim, quality popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/606/696/HD-wallpaper-ramadan-2017-allah-arab-god-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/606/696/HD-wallpaper-ramadan-2017-allah-arab-god-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kzyvs",
    "tags": "HD phone wallpaper Ramadan, 2017, allah, arab, god, islam, muslim",
    "description": "HD phone wallpaper Ramadan, 2017, allah, arab, god, islam, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/611/891/HD-wallpaper-allah-heart-islam-islamic-love-minimal-minimalist-mosque-muslim-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/611/891/HD-wallpaper-allah-heart-islam-islamic-love-minimal-minimalist-mosque-muslim-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kfxwm",
    "tags": "HD phone wallpaper Allah, heart, islam, islamic, love, minimal, minimalist, mosque, muslim, quran",
    "description": "HD phone wallpaper Allah, heart, islam, islamic, love, minimal, minimalist, mosque, muslim, quran latest "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/22/893/HD-wallpaper-alkaba-allah-god-iphone-islam-islamic-kaba-mosque-muslim-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/22/893/HD-wallpaper-alkaba-allah-god-iphone-islam-islamic-kaba-mosque-muslim-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-onoqn",
    "tags": "HD phone wallpaper ALKABA, allah, god, iphone , islam, islamic, kaba, mosque, muslim, quran",
    "description": "HD phone wallpaper ALKABA, allah, god, iphone , islam, islamic, kaba, mosque, muslim, quran"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/307/24/HD-wallpaper-islamic-islam-muslim-quran-quranic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/307/24/HD-wallpaper-islamic-islam-muslim-quran-quranic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ahyyh",
    "tags": "HD phone wallpaper Islamic, islam, muslim, quran, quranic,",
    "description": "HD phone wallpaper Islamic, islam, muslim, quran, quranic, popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/665/316/HD-wallpaper-islamic-islam-allah-makkah-quran-ayat-quranic-verse-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/665/316/HD-wallpaper-islamic-islam-allah-makkah-quran-ayat-quranic-verse-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjyvj",
    "tags": "HD phone wallpaper Islamic, islam, allah makkah, quran, ayat, quranic verse, islamic",
    "description": "HD phone wallpaper Islamic, islam, allah makkah, quran, ayat, quranic verse, islamic popular filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/645/623/HD-wallpaper-quran-verses-allah-islam-islamic-death.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/645/623/HD-wallpaper-quran-verses-allah-islam-islamic-death.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vqhiq",
    "tags": "HD phone wallpaper Quran verses, allah, islam, islamic, death",
    "description": "HD phone wallpaper Quran verses, allah, islam, islamic, death"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/113/514/HD-wallpaper-quran-allah-book-dark-islam-islamic-makkah-pakistan-read.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/113/514/HD-wallpaper-quran-allah-book-dark-islam-islamic-makkah-pakistan-read.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjxgi",
    "tags": "HD phone wallpaper Quran, allah, book, dark, islam, islamic, makkah, pakistan, read",
    "description": "HD phone wallpaper Quran, allah, book, dark, islam, islamic, makkah, pakistan, read latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/536/740/HD-wallpaper-allah-call-upon-me-ayah-ayat-islam-kuran-lord-god-merciful-muslim-quran-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/536/740/HD-wallpaper-allah-call-upon-me-ayah-ayat-islam-kuran-lord-god-merciful-muslim-quran-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kycgn",
    "tags": "HD phone wallpaper Allah - Call upon me, ayah, ayat, islam, kuran, lord god, merciful, muslim, quran, ramadan",
    "description": "HD phone wallpaper Allah - Call upon me, ayah, ayat, islam, kuran, lord god, merciful, muslim, quran, ramadan "
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/678/162/HD-wallpaper-allah-allahu-akbar-islam-love-makkah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/678/162/HD-wallpaper-allah-allahu-akbar-islam-love-makkah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kolmv",
    "tags": "HD phone wallpaper Allah, allahu akbar, islam, love, makkah",
    "description": "HD phone wallpaper Allah, allahu akbar, islam, love, makkah"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/235/411/HD-wallpaper-allahu-akbar-good-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/235/411/HD-wallpaper-allahu-akbar-good-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aidkq",
    "tags": "HD phone wallpaper Allahu Akbar, good, islamic",
    "description": "HD phone wallpaper Allahu Akbar, good, islamic popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/929/956/HD-wallpaper-allah-alhamdulillah-allahu-islamic-muslim-ramadan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/929/956/HD-wallpaper-allah-alhamdulillah-allahu-islamic-muslim-ramadan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fqnkb",
    "tags": "HD phone wallpaper Allah, alhamdulillah, allahu, islamic, muslim, ramadan",
    "description": "HD phone wallpaper Allah, alhamdulillah, allahu, islamic, muslim, ramadan latest filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/756/233/HD-wallpaper-allah-is-one-god-islam-islamic-makkah-muslim-pakistan.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/756/233/HD-wallpaper-allah-is-one-god-islam-islamic-makkah-muslim-pakistan.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-knuqr",
    "tags": "HD phone wallpaper Allah is One, god, islam, islamic, makkah, muslim, pakistan",
    "description": "HD phone wallpaper Allah is One, god, islam, islamic, makkah, muslim, pakistan latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/33/1019/HD-wallpaper-allah-black-dark-god-islam-islamic-makkah-one-pakistan-wall.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/33/1019/HD-wallpaper-allah-black-dark-god-islam-islamic-makkah-one-pakistan-wall.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aclvp",
    "tags": "HD phone wallpaper Allah, black, dark, god, islam, islamic, makkah, one, pakistan, wall",
    "description": "HD phone wallpaper Allah, black, dark, god, islam, islamic, makkah, one, pakistan, wall quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/977/997/HD-wallpaper-allah-is-watchingus-allah-islam-muslim-peace.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/977/997/HD-wallpaper-allah-is-watchingus-allah-islam-muslim-peace.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gdvla",
    "tags": "HD phone wallpaper Allah is watchingus, allah, islam, muslim, peace",
    "description": "HD phone wallpaper Allah is watchingus, allah, islam, muslim, peace"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/696/318/HD-wallpaper-lost-and-found-islam-islamic-quotes-quran-guide-guidance-verses-dhuha.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/696/318/HD-wallpaper-lost-and-found-islam-islamic-quotes-quran-guide-guidance-verses-dhuha.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nitrw",
    "tags": "HD phone wallpaper Lost and Found, islam, islamic, quotes, quran, guide, guidance, verses, dhuha",
    "description": "HD phone wallpaper Lost and Found, islam, islamic, quotes, quran, guide, guidance, verses, dhuha popular quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/645/623/HD-wallpaper-quran-verses-allah-islam-islamic-death.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/645/623/HD-wallpaper-quran-verses-allah-islam-islamic-death.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vqhiq",
    "tags": "HD phone wallpaper Quran verses, allah, islam, islamic, death",
    "description": "HD phone wallpaper Quran verses, allah, islam, islamic, death latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/210/979/HD-wallpaper-islamic-quotes-quran-quran-verses.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/210/979/HD-wallpaper-islamic-quotes-quran-quran-verses.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ehscf",
    "tags": "HD phone wallpaper Islamic quotes quran, Quran Verses",
    "description": "HD phone wallpaper Islamic quotes quran, Quran Verses latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/369/74/HD-wallpaper-quran-quran-verses.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/369/74/HD-wallpaper-quran-quran-verses.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ehsck",
    "tags": "HD phone wallpaper Quran, Quran Verses",
    "description": "HD phone wallpaper Quran, Quran Verses"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/318/771/HD-wallpaper-islam-quran-verses.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/318/771/HD-wallpaper-islam-quran-verses.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ehscy",
    "tags": "HD phone wallpaper Islam, Quran Verses",
    "description": "HD phone wallpaper popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/971/213/HD-wallpaper-islamic-arabian-arabic-quotes-hadith-iphone-islamic-islamic-inspirational-quotes-islamic-qoutes-islamic-islamic-muslim-quotes-quotes-quran-quotes-quran-verses-quran-religious-quotes.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/971/213/HD-wallpaper-islamic-arabian-arabic-quotes-hadith-iphone-islamic-islamic-inspirational-quotes-islamic-qoutes-islamic-islamic-muslim-quotes-quotes-quran-quotes-quran-verses-quran-religious-quotes.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fwpzu",
    "tags": "HD phone wallpaper Islamic , Arabian, Arabic Quotes, Hadith, Iphone Islamic, Islamic Inspirational Quotes, Islamic Qoutes, Islamic . Islamic , Muslim Quotes, Quotes, Quran Quotes, Quran Verses, Quran , Religious Quotes, Words, HD phone wallpaper latest",
    "description": "HD phone wallpaper Islamic , Arabian, Arabic Quotes, Hadith, Iphone Islamic, Islamic Inspirational Quotes, Islamic Qoutes, Islamic . Islamic , Muslim Quotes, Quotes, Quran Quotes, Quran Verses, Quran , Religious Quotes, Words, HD phone wallpaper latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/416/435/HD-wallpaper-dua-allah-arabian-arabic-quotes-islamic-inspirational-quotes-islamic-qoutes-muslim-quotes-quran-quotes-religious-quotes.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/416/435/HD-wallpaper-dua-allah-arabian-arabic-quotes-islamic-inspirational-quotes-islamic-qoutes-muslim-quotes-quran-quotes-religious-quotes.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-otvzx",
    "tags": "HD phone wallpaper Dua allah, Arabian, Arabic Quotes, Islamic Inspirational Quotes, Islamic Qoutes, Muslim Quotes, Quran Quotes, Religious Quotes",
    "description": "HD phone wallpaper Dua allah, Arabian, Arabic Quotes, Islamic Inspirational Quotes, Islamic Qoutes, Muslim Quotes, Quran Quotes, Religious Quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/685/559/HD-wallpaper-all-power-belo-allah-allah-arab-arabic-islam-kuran-merciful-muslims-quran-ramadan-resolution.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/685/559/HD-wallpaper-all-power-belo-allah-allah-arab-arabic-islam-kuran-merciful-muslims-quran-ramadan-resolution.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nieel",
    "tags": "HD phone wallpaper All POWER Belo-Allah, allah, arab, arabic, islam, kuran, merciful, muslims, quran, ramadan",
    "description": "HD phone wallpaper All POWER Belo-Allah, allah, arab, arabic, islam, kuran, merciful, muslims, quran, ramadan latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/525/429/HD-wallpaper-islamic-quotes-arabian-arabic-quotes-islamic-islamic-inspirational-quotes-islamic-qoutes-muslim-quotes-quran-quotes-religious-quotes.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/525/429/HD-wallpaper-islamic-quotes-arabian-arabic-quotes-islamic-islamic-inspirational-quotes-islamic-qoutes-muslim-quotes-quran-quotes-religious-quotes.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ffbuv",
    "tags": "HD phone wallpaper Islamic Quotes, Arabian, Arabic Quotes, Islamic, Islamic Inspirational Quotes, Islamic Qoutes, Muslim Quotes, Quran Quotes, Religious Quotes",
    "description": "HD phone wallpaper Islamic Quotes, Arabian, Arabic Quotes, Islamic, Islamic Inspirational Quotes, Islamic Qoutes, Muslim Quotes, Quran Quotes, Religious Quotes latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/502/1000/HD-wallpaper-zikr-and-daily-duaa-arabic-dua-eid-holy-islam-islamic-muslim-religious.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/502/1000/HD-wallpaper-zikr-and-daily-duaa-arabic-dua-eid-holy-islam-islamic-muslim-religious.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gvrtn",
    "tags": "HD phone wallpaper zikr and daily duaa, arabic, dua, eid, holy, islam, islamic, muslim, religious",
    "description": "HD phone wallpaper zikr and daily duaa, arabic, dua, eid, holy, islam, islamic, muslim, religious latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/169/332/HD-wallpaper-islamic-quote-allah-huawei-iphone-islam-life-mi-motivation-muslim-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/169/332/HD-wallpaper-islamic-quote-allah-huawei-iphone-islam-life-mi-motivation-muslim-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gtvrs",
    "tags": "HD phone wallpaper Islamic Quote, allah, huawei, iphone, islam, life, mi, motivation, muslim, quran",
    "description": "HD phone wallpaper Islamic Quote, allah, huawei, iphone, islam, life, mi, motivation, muslim, quran latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/305/715/HD-wallpaper-say-bismi-allah-allah-arab-arabic-high-islam-islamic-lord-muslim-quality-say.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/305/715/HD-wallpaper-say-bismi-allah-allah-arab-arabic-high-islam-islamic-lord-muslim-quality-say.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aqmgu",
    "tags": "HD phone wallpaper Say Bismi-Allah, allah, arab, arabic, high, islam, islamic, lord, muslim, quality, say,",
    "description": "HD phone wallpaper Say Bismi-Allah, allah, arab, arabic, high, islam, islamic, lord, muslim, quality, say,"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/609/293/HD-wallpaper-islamic-arabian-arabic-quotes-hadith-iphone-islamic-islamic-inspirational-quotes-islamic-qoutes-islamic-islamic-muslim-quotes-quotes-quran-quotes-quran-verses-quran-religious-quotes.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/609/293/HD-wallpaper-islamic-arabian-arabic-quotes-hadith-iphone-islamic-islamic-inspirational-quotes-islamic-qoutes-islamic-islamic-muslim-quotes-quotes-quran-quotes-quran-verses-quran-religious-quotes.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-pbnyb",
    "tags": "HD phone wallpaper Islamic , Arabian, Arabic Quotes, Hadith, Iphone Islamic, Islamic Inspirational Quotes, Islamic Qoutes, Islamic . Islamic , Muslim Quotes, Quotes, Quran Quotes, Quran Verses, Quran , Religious Quotes, Words, HD phone wallpaper",
    "description": "HD phone wallpaper Islamic , Arabian, Arabic Quotes, Hadith, Iphone Islamic, Islamic Inspirational Quotes, Islamic Qoutes, Islamic . Islamic , Muslim Quotes, Quotes, Quran Quotes, Quran Verses, Quran , Religious Quotes, Words, HD phone wallpaper latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/735/475/HD-wallpaper-islamic-beautiful-iphone-islam-life-motivation-motivational-muslim-quote-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/735/475/HD-wallpaper-islamic-beautiful-iphone-islam-life-motivation-motivational-muslim-quote-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fxjti",
    "tags": "HD phone wallpaper Islamic, bonito, iphone, islam, life, motivation, motivational, muslim, quote, quran",
    "description": "HD phone wallpaper Islamic, bonito, iphone, islam, life, motivation, motivational, muslim, quote, quran latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/169/332/HD-wallpaper-islamic-quote-allah-huawei-iphone-islam-life-mi-motivation-muslim-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/169/332/HD-wallpaper-islamic-quote-allah-huawei-iphone-islam-life-mi-motivation-muslim-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gtvrs",
    "tags": "HD phone wallpaper Islamic Quote, allah, huawei, iphone, islam, life, mi, motivation, muslim, quran",
    "description": "HD phone wallpaper Islamic Quote, allah, huawei, iphone, islam, life, mi, motivation, muslim, quran"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/463/951/HD-wallpaper-allah-is-with-me-islamic-islam-islamic-allah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/463/951/HD-wallpaper-allah-is-with-me-islamic-islam-islamic-allah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vdwdc",
    "tags": "Allah Is With Me, islamic, islam, islamic, allah, HD phone wallpaper",
    "description": "HD phone wallpaper Allah Is With Me, islamic, islam, islamic, allah, HD phone wallpaper latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/239/122/HD-wallpaper-allah-watching-me-god-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/239/122/HD-wallpaper-allah-watching-me-god-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nrkui",
    "tags": "Allah Watching Me, god, islam, muslim, HD phone wallpaper",
    "description": "HD phone wallpaper Allah Watching Me, god, islam, muslim, HD phone wallpaper latest quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/860/701/HD-wallpaper-islamic-dhikr-of-allah-islam.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/860/701/HD-wallpaper-islamic-dhikr-of-allah-islam.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gnhvb",
    "tags": "Islamic , dhikr of allah, islam, HD phone wallpaper",
    "description": "HD phone wallpaper Islamic , dhikr of allah, islam, HD phone wallpaper quotes latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/26/718/HD-wallpaper-allah-is-watching-me-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/26/718/HD-wallpaper-allah-is-watching-me-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vsjke",
    "tags": "Allah is watching me, Islamic, HD phone wallpaper",
    "description": "Allah is watching me, Islamic, HD phone wallpaper quotes latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/506/692/HD-wallpaper-islamic-allah-islam.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/506/692/HD-wallpaper-islamic-allah-islam.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-agunv",
    "tags": "Islamic, allah, islam",
    "description": "HD phone wallpaper Islamic, allah, islam quotes popular filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/176/404/HD-wallpaper-no-god-but-allah-allah-athkar-god-islam-islamic-muslim-quran.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/176/404/HD-wallpaper-no-god-but-allah-allah-athkar-god-islam-islamic-muslim-quran.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-plqvl",
    "tags": "No God But ALLAH, allah, athkar, god, islam, islamic, muslim, quran",
    "description": "HD phone wallpaper No God But ALLAH, allah, athkar, god, islam, islamic, muslim, quran quotes latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/363/938/HD-wallpaper-asgfer-allah-allah-galaxy-iphone-islam-islamic-note-s20-s30.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/363/938/HD-wallpaper-asgfer-allah-allah-galaxy-iphone-islam-islamic-note-s20-s30.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-awkkx",
    "tags": "asgfer allah, allah, galaxy, iphone, islam, islamic, note, s20, s30",
    "description": "HD phone wallpaper asgfer allah, allah, galaxy, iphone, islam, islamic, note, s20, s30 latest quotes filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/528/212/HD-wallpaper-alhamdulillah-allah-athkar-god-islam-islamic-muslim-tasbih.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/528/212/HD-wallpaper-alhamdulillah-allah-athkar-god-islam-islamic-muslim-tasbih.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kleoa",
    "tags": "ALHAMDULILLAH, allah, athkar, god, islam, islamic, muslim, tasbih,",
    "description": "HD phone wallpaper ALHAMDULILLAH, allah, athkar, god, islam, islamic, muslim, tasbih, quotes filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/107/581/HD-wallpaper-islamic-allah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/107/581/HD-wallpaper-islamic-allah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kwqne",
    "tags": "Islamic, allah",
    "description": "HD phone wallpaper Islamic, allah latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/996/543/HD-wallpaper-allah-is-watching-camera-flower-islam-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/996/543/HD-wallpaper-allah-is-watching-camera-flower-islam-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nmwps",
    "tags": "Allah is watching, camera, flower islam, islamic",
    "description": "HD phone wallpaper Allah is watching, camera, flower islam, islamic latest filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/575/180/HD-wallpaper-astaghfaro-allah-athkar-god-iphone-islam-islamic-landscape-muslim-nature.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/575/180/HD-wallpaper-astaghfaro-allah-athkar-god-iphone-islam-islamic-landscape-muslim-nature.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kogbs",
    "tags": "ASTAGHFARO ALLAH, athkar, god iphone , islam, islamic, landscape, muslim, nature",
    "description": "HD phone wallpaper ASTAGHFARO ALLAH, athkar, god iphone , islam, islamic, landscape, muslim, nature filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/203/963/HD-wallpaper-allah-athkar-god-iphone-islam-islamic-landscape-muslim-nature.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/203/963/HD-wallpaper-allah-athkar-god-iphone-islam-islamic-landscape-muslim-nature.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gwigg",
    "tags": "allah , athkar, god, iphone , islam, islamic, landscape, muslim, nature",
    "description": "HD phone wallpaper allah , athkar, god, iphone , islam, islamic, landscape, muslim, nature filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/927/149/HD-wallpaper-no-god-but-allah-allah-athkar-dini-god-iphone-iphone-islam-islamic-mosque-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/927/149/HD-wallpaper-no-god-but-allah-allah-athkar-dini-god-iphone-iphone-islam-islamic-mosque-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-arovf",
    "tags": "no God but Allah, allah, athkar, dini, god, iphone, iphone , islam, islamic, mosque, muslim",
    "description": "HD phone wallpaper no God but Allah, allah, athkar, dini, god, iphone, iphone , islam, islamic, mosque, muslim popular quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/303/33/HD-wallpaper-allah-akbar-athkar-dini-god-iphone-islam-islamic-mosque-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/303/33/HD-wallpaper-allah-akbar-athkar-dini-god-iphone-islam-islamic-mosque-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nstcg",
    "tags": "ALLAH AKBAR, athkar, dini, god, iphone , islam, islamic, mosque, muslim",
    "description": "HD phone wallpaper ALLAH AKBAR, athkar, dini, god, iphone , islam, islamic, mosque, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/10/383/HD-wallpaper-allah-arabic-words-muslim-islamic-islam-god-majesty-athkar-subhanallah-subhan-allah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/10/383/HD-wallpaper-allah-arabic-words-muslim-islamic-islam-god-majesty-athkar-subhanallah-subhan-allah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nnpov",
    "tags": "Allah arabic words , muslim, islamic, islam, god, majesty, athkar, subhanallah, subhan allah",
    "description": "HD phone wallpaper Allah arabic words , muslim, islamic, islam, god, majesty, athkar, subhanallah, subhan allah popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/323/392/HD-wallpaper-alhamdllah-arabic-allah-alhamd-muslim-islam-islamic-god-majesty-thikr.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/323/392/HD-wallpaper-alhamdllah-arabic-allah-alhamd-muslim-islam-islamic-god-majesty-thikr.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nvwkp",
    "tags": "Alhamdllah arabic, allah, alhamd, muslim, islam, islamic, god, majesty, thikr,",
    "description": "HD phone wallpaper Alhamdllah arabic, allah, alhamd, muslim, islam, islamic, god, majesty, thikr,"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/261/749/HD-wallpaper-allah-arabic-words-allah-god-nice-arabic-athkar-muslim-islamic-galaxy-theme.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/261/749/HD-wallpaper-allah-arabic-words-allah-god-nice-arabic-athkar-muslim-islamic-galaxy-theme.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aixfm",
    "tags": "Allah arabic words , allah, god, nice, arabic, athkar, muslim, islamic galaxy, theme, ",
    "description": "HD phone wallpaper Allah arabic words , allah, god, nice, arabic, athkar, muslim, islamic galaxy, theme, quotes latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/959/919/HD-wallpaper-allah-2018-arab-arabic-flowers-god-islam-muslim-nice.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/959/919/HD-wallpaper-allah-2018-arab-arabic-flowers-god-islam-muslim-nice.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kvbgd",
    "tags": "Allah, 2018, arab, arabic, flowers, god, islam, muslim, nice",
    "description": "HD phone wallpaper Allah, 2018, arab, arabic, flowers, god, islam, muslim, nice popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/4/68/HD-wallpaper-allah-2018-arab-arabic-black-god-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/4/68/HD-wallpaper-allah-2018-arab-arabic-black-god-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nisgl",
    "tags": "Allah, 2018, arab, arabic, black, god, gold, islam, muslim",
    "description": "HD phone wallpaper Allah, 2018, arab, arabic, black, god, gold, islam, muslim latest filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/440/908/HD-wallpaper-the-prophet-muhammad-2017-allah-arab-black-god-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/440/908/HD-wallpaper-the-prophet-muhammad-2017-allah-arab-black-god-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-keihv",
    "tags": "The Prophet Muhammad, 2017, allah, arab, black, god, gold, islam, muslim",
    "description": "HD phone wallpaper The Prophet Muhammad, 2017, allah, arab, black, god, gold, islam, muslim latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/990/504/HD-wallpaper-allah-arab-god-gold-golden-islam-islamic-mohammed-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/990/504/HD-wallpaper-allah-arab-god-gold-golden-islam-islamic-mohammed-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nhvrj",
    "tags": "Allah, arab, god, gold, golden, islam, islamic, mohammed, muslim",
    "description": "HD phone wallpaper Allah, arab, god, gold, golden, islam, islamic, mohammed, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/16/230/HD-wallpaper-allah-is-with-patie-arab-arabic-grey-islam-islamic-muslim-patience-quran-surah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/16/230/HD-wallpaper-allah-is-with-patie-arab-arabic-grey-islam-islamic-muslim-patience-quran-surah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kgnqk",
    "tags": "ALLAH is with PATIE-, arab, arabic, gris, islam, islamic, muslim, patience, quran, surah",
    "description": "HD phone wallpaper ALLAH is with PATIE-, arab, arabic, gris, islam, islamic, muslim, patience, quran, surah quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/961/355/HD-wallpaper-allah-2017-arab-arabic-black-god-gold-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/961/355/HD-wallpaper-allah-2017-arab-arabic-black-god-gold-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nvitp",
    "tags": "Allah, 2017, arab, arabic, black, god, gold, islam, muslim,",
    "description": "HD phone wallpaper Allah, 2017, arab, arabic, black, god, gold, islam, muslim, latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/98/22/HD-wallpaper-allah-2017-arab-arabic-god-islam-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/98/22/HD-wallpaper-allah-2017-arab-arabic-god-islam-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kjbyk",
    "tags": "Allah, 2017, arab, arabic, god, islam, muslim",
    "description": "HD phone wallpaper Allah, 2017, arab, arabic, god, islam, muslim popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/787/195/HD-wallpaper-i-am-ok-allah-black-cute-dark-god-islamic-lord-love-muslim.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/787/195/HD-wallpaper-i-am-ok-allah-black-cute-dark-god-islamic-lord-love-muslim.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-ahobb",
    "tags": "I am OK, allah, black, cute, dark, god, islamic, lord, love, muslim,",
    "description": "HD phone wallpaper I am OK, allah, black, cute, dark, god, islamic, lord, love, muslim, latest filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/277/227/HD-wallpaper-prophet-mohammad-allah-muslim-islamic-islam-god-rain-glass-arabic-athkar.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/277/227/HD-wallpaper-prophet-mohammad-allah-muslim-islamic-islam-god-rain-glass-arabic-athkar.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-krwru",
    "tags": "Prophet mohammad, allah, muslim, islamic, islam, god, rain, glass, arabic, athkar",
    "description": "HD phone wallpaper Prophet mohammad, allah, muslim, islamic, islam, god, rain, glass, arabic, athkar popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/885/630/HD-wallpaper-prophet-mohammad-mohamad-rain-allah-god-islamic-islam-night-athkar-arabic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/885/630/HD-wallpaper-prophet-mohammad-mohamad-rain-allah-god-islamic-islam-night-athkar-arabic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kzbnv",
    "tags": "Prophet mohammad, mohamad, rain, allah, god, islamic, islam, night, athkar, arabic",
    "description": "HD phone wallpaper Prophet mohammad, mohamad, rain, allah, god, islamic, islam, night, athkar, arabic popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/110/438/HD-wallpaper-allah-god-galaxy-islamic-prophet-nice-theme-muslim-athkar.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/110/438/HD-wallpaper-allah-god-galaxy-islamic-prophet-nice-theme-muslim-athkar.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nhqmv",
    "tags": "Allah , god galaxy, islamic, prophet, nice, theme, muslim, athkar,",
    "description": "HD phone wallpaper Allah , god galaxy, islamic, prophet, nice, theme, muslim, athkar,"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/165/668/HD-wallpaper-allah-athkar-god-gold-islam-islamic-muslim-names-of-allah.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/165/668/HD-wallpaper-allah-athkar-god-gold-islam-islamic-muslim-names-of-allah.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kizyi",
    "tags": "Allah, athkar, god, gold islam, islamic, muslim, names of allah",
    "description": "HD phone wallpaper Allah, athkar, god, gold islam, islamic, muslim, names of allah popular filter"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/771/296/HD-wallpaper-allah-arabic-words-allah-muslim-islam-islamic-god-athkar-arabic-majesty.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/771/296/HD-wallpaper-allah-arabic-words-allah-muslim-islam-islamic-god-athkar-arabic-majesty.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-acmld",
    "tags": "Allah arabic words , allah, muslim, islam, islamic, god, athkar, arabic, majesty",
    "description": "HD phone wallpaper Allah arabic words , allah, muslim, islam, islamic, god, athkar, arabic, majesty popular filter quotes"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/311/371/HD-wallpaper-allah-god-nice-muslim-islamic-athkar-arabic-theme-blue.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/311/371/HD-wallpaper-allah-god-nice-muslim-islamic-athkar-arabic-theme-blue.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gpqen",
    "tags": "Allah , god, nice, muslim, islamic, athkar, arabic, theme, blue",
    "description": "HD phone wallpaper Allah , god, nice, muslim, islamic, athkar, arabic, theme, blue popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/685/559/HD-wallpaper-all-power-belo-allah-allah-arab-arabic-islam-kuran-merciful-muslims-quran-ramadan-resolution.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/685/559/HD-wallpaper-all-power-belo-allah-allah-arab-arabic-islam-kuran-merciful-muslims-quran-ramadan-resolution.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-nieel",
    "tags": "All POWER Belo-Allah, allah, arab, arabic, islam, kuran, merciful, muslims, quran, ramadan, resolution",
    "description": "HD phone wallpaper All POWER Belo-Allah, allah, arab, arabic, islam, kuran, merciful, muslims, quran, ramadan, resolution quotes popular"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/723/778/HD-wallpaper-rose-hijab-blue-heart-logo-red-roses.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/723/778/HD-wallpaper-rose-hijab-blue-heart-logo-red-roses.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-odfof",
    "tags": "Rose hijab, blue, heart, logo, red, roses, HD phone wallpaper",
    "description": "Rose hijab, blue, heart, logo, red, roses, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/421/531/HD-wallpaper-hijab-styles-hijab-cartoon.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/421/531/HD-wallpaper-hijab-styles-hijab-cartoon.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-woygr",
    "tags": "Hijab Styles, Hijab Cartoon, HD phone wallpaper",
    "description": "Hijab Styles, Hijab Cartoon, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/416/307/HD-wallpaper-muslimah-beautifull-cute-hijab-islam-nikab-ramadhan-syari.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/416/307/HD-wallpaper-muslimah-beautifull-cute-hijab-islam-nikab-ramadhan-syari.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-fcfyj",
    "tags": "muslimah , bonito, cute, hijab, islam, nikab, ramadhan, syari, HD phone wallpaper",
    "description": "muslimah , bonito, cute, hijab, islam, nikab, ramadhan, syari, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/121/1005/HD-wallpaper-hijab-styles-purple-hijab-purple-hijab.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/121/1005/HD-wallpaper-hijab-styles-purple-hijab-purple-hijab.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-wffcc",
    "tags": "Hijab Styles, purple hijab, purple, hijab, HD phone wallpaper",
    "description": "Hijab Styles, purple hijab, purple, hijab, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/951/796/HD-wallpaper-islamic-girl-hijab-girl-muslim-girl.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/951/796/HD-wallpaper-islamic-girl-hijab-girl-muslim-girl.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-wpcoz",
    "tags": "Islamic Girl, Hijab Girl, muslim girl, HD phone wallpaper",
    "description": "Islamic Girl, Hijab Girl, muslim girl, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/647/715/HD-wallpaper-lt-3-hijab-moslem-pink-muslim-sweet.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/647/715/HD-wallpaper-lt-3-hijab-moslem-pink-muslim-sweet.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-vcubh",
    "tags": "hijab, moslem, pink, muslim, sweet, HD phone wallpaper",
    "description": "hijab, moslem, pink, muslim, sweet, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/800/974/HD-wallpaper-islamic-girl-cute-hijab-girl-muslim-girl.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/800/974/HD-wallpaper-islamic-girl-cute-hijab-girl-muslim-girl.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-womrp",
    "tags": "Islamic Girl, Cute Hijab Girl, muslim girl, HD phone wallpaper",
    "description": "Islamic Girl, Cute Hijab Girl, muslim girl, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/845/39/HD-wallpaper-hat-girl-anime-cap-hidden-face-hijab.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/845/39/HD-wallpaper-hat-girl-anime-cap-hidden-face-hijab.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gsowq",
    "tags": "Hat girl, anime, cap, hidden face, hijab, HD phone wallpaper",
    "description": "Hat girl, anime, cap, hidden face, hijab, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/155/838/HD-wallpaper-queen-in-islam-clan-diamond-girl-hijab-neqab-princess-tokyo.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/155/838/HD-wallpaper-queen-in-islam-clan-diamond-girl-hijab-neqab-princess-tokyo.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kbiit",
    "tags": "Queen in Islam, clan, diamond, girl, hijab, neqab, princess, tokyo, HD phone wallpaper",
    "description": "Queen in Islam, clan, diamond, girl, hijab, neqab, princess, tokyo, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/99/132/HD-wallpaper-hijab-ansari-waqar.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/99/132/HD-wallpaper-hijab-ansari-waqar.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-pyvdh",
    "tags": "Hijab, ansari, waqar, HD phone wallpaper",
    "description": "Hijab, ansari, waqar, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/580/418/HD-wallpaper-islamic-hijab-girl-anime-hijab-girl.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/580/418/HD-wallpaper-islamic-hijab-girl-anime-hijab-girl.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gzmre",
    "tags": "Islamic hijab girl, anime, hijab girl, HD phone wallpaper",
    "description": "Islamic hijab girl, anime, hijab girl, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/469/433/HD-wallpaper-black-hijab-girl-2017-cash-duck-hijab-hip-logo-paris-screens-side-vader.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/469/433/HD-wallpaper-black-hijab-girl-2017-cash-duck-hijab-hip-logo-paris-screens-side-vader.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aqdgj",
    "tags": "Black hijab girl, 2017, cash, duck, hijab, hip, logo, paris, screens, side, vader, HD phone wallpaper",
    "description": "Black hijab girl, 2017, cash, duck, hijab, hip, logo, paris, screens, side, vader, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/703/552/HD-wallpaper-islamic-hijab-girl-anime-green-hijab-girl-islamic-pic-leaf.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/703/552/HD-wallpaper-islamic-hijab-girl-anime-green-hijab-girl-islamic-pic-leaf.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-kwhbw",
    "tags": "Islamic hijab girl, anime, green, hijab girl, islamic pic, leaf, HD phone wallpaper",
    "description": "Islamic hijab girl, anime, green, hijab girl, islamic pic, leaf, HD phone wallpaper latest"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/402/606/HD-wallpaper-muslim-girl-hijab-hijab-queen-hijab-queen.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/402/606/HD-wallpaper-muslim-girl-hijab-hijab-queen-hijab-queen.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-wkejn",
    "tags": "Muslim Girl Hijab, hijab queen, hijab, queen, HD phone wallpaper",
    "description": "Muslim Girl Hijab, hijab queen, hijab, queen, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/255/181/HD-wallpaper-islamic-hijab-girl-hijab-girl-hijab-pic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/255/181/HD-wallpaper-islamic-hijab-girl-hijab-girl-hijab-pic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-gbodo",
    "tags": "Islamic hijab girl, hijab girl, hijab pic, HD phone wallpaper",
    "description": "Islamic hijab girl, hijab girl, hijab pic, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://w0.peakpx.com/wallpaper/81/150/HD-wallpaper-islamic-hijab-girl-anime-girl-hijab-girl-islamic.jpg",
    "fullUrl": "https://w0.peakpx.com/wallpaper/81/150/HD-wallpaper-islamic-hijab-girl-anime-girl-hijab-girl-islamic.jpg",
    "pageUrl": "https://www.peakpx.com/en/hd-wallpaper-desktop-aplun",
    "tags": "Islamic hijab girl, anime, girl, hijab girl, islamic, HD phone wallpaper",
    "description": "Islamic hijab girl, anime, girl, hijab girl, islamic, HD phone wallpaper"
  },
  {
    "thumbUrl": "https://c0.wallpaperflare.com/preview/649/5/198/malaysia-shah-alam-masjid-sultan-salahuddin-abdul-aziz-shah-sunset.jpg",
    "fullUrl": "https://c0.wallpaperflare.com/preview/649/5/198/malaysia-shah-alam-masjid-sultan-salahuddin-abdul-aziz-shah-sunset.jpg",
    "pageUrl": "https://www.wallpaperflare.com/malaysia-shah-alam-masjid-sultan-salahuddin-abdul-aziz-shah-wallpaper-eekeb",
    "tags": "HD wallpaper: malaysia, shah alam, masjid sultan salahuddin abdul aziz shah",
    "description": "HD wallpaper: malaysia, shah alam, masjid sultan salahuddin abdul aziz shah popular"
  },
  {
    "thumbUrl": "https://c0.wallpaperflare.com/preview/627/61/187/malaysia-shah-alam-persiaran-masjid-st-white.jpg",
    "fullUrl": "https://c0.wallpaperflare.com/preview/627/61/187/malaysia-shah-alam-persiaran-masjid-st-white.jpg",
    "pageUrl": "https://www.wallpaperflare.com/malaysia-shah-alam-persiaran-masjid-st-white-black-worship-wallpaper-ebvjz",
    "tags": "HD wallpaper: malaysia, shah alam, persiaran masjid st., white, black, worship",
    "description": "HD wallpaper: malaysia, shah alam, persiaran masjid st., white, black, worship latest"
  },
  {
    "thumbUrl": "https://p0.pxfuel.com/preview/888/361/258/mosque-malaysia-putrajaya-islam.jpg",
    "fullUrl": "https://p0.pxfuel.com/preview/888/361/258/mosque-malaysia-putrajaya-islam.jpg",
    "pageUrl": "https://www.pxfuel.com/en/free-photo-qpskx",
    "tags": "mosque, malaysia, putrajaya, islam, travel, architecture, muslim, building, landscape, tourism",
    "description": "mosque, malaysia, putrajaya, islam, travel, architecture, muslim, building, landscape, tourism popular"
  },
  {
    "thumbUrl": "https://c1.wallpaperflare.com/preview/860/676/901/house-of-allah-mecca-mosque-muslim.jpg",
    "fullUrl": "https://c1.wallpaperflare.com/preview/860/676/901/house-of-allah-mecca-mosque-muslim.jpg",
    "pageUrl": "https://www.wallpaperflare.com/gold-colored-decor-house-of-allah-mecca-mosque-muslim-kaaba-wallpaper-atcna",
    "tags": "HD wallpaper: gold-colored decor, house of allah, mecca, mosque, muslim, kaaba",
    "description": "HD wallpaper: gold-colored decor, house of allah, mecca, mosque, muslim, kaaba latest"
  },
  {
    "thumbUrl": "https://c1.wallpaperflare.com/preview/5/202/483/building-city-urban-night.jpg",
    "fullUrl": "https://c1.wallpaperflare.com/preview/5/202/483/building-city-urban-night.jpg",
    "pageUrl": "https://www.wallpaperflare.com/kaaba-praying-ground-grand-mosque-of-mecca-during-nighttime-wallpaper-zmuwk",
    "tags": "HD wallpaper: Kaaba praying ground, Grand Mosque of Mecca during nighttime",
    "description": "HD wallpaper: Kaaba praying ground, Grand Mosque of Mecca during nighttime popular"
  },
  {
    "thumbUrl": "https://wallpapers.com/images/high/islamic-pictures-9mf196aigki0utdi.webp",
    "fullUrl": "https://wallpapers.com/images/high/islamic-pictures-9mf196aigki0utdi.webp",
    "pageUrl": "https://wallpapers.com/picture/islamic-pictures-9mf196aigki0utdi.html",
    "tags": "Islamic Pictures Love Pictures Faith Pictures Allah Pictures Architecture Pictures Peace Pictures Hd Islamic Pictures Ramadan Pictures",
    "description": "Islamic Pictures Love Pictures Faith Pictures Allah Pictures Architecture Pictures Peace Pictures Hd Islamic Pictures Ramadan Pictures latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/22/f6/00/22f600b8d3593a91744c7a1f9e3fa09a.jpg",
    "fullUrl": "https://i.pinimg.com/564x/22/f6/00/22f600b8d3593a91744c7a1f9e3fa09a.jpg",
    "pageUrl": "https://in.pinterest.com/pin/579908889499193756/",
    "tags": "islam islamic wallpaper allah",
    "description": "islam islamic wallpaper allah popular"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/d1/72/5e/d1725eebdfdffb64b6fbd6c3c19efa4a.jpg",
    "fullUrl": "https://i.pinimg.com/originals/d1/72/5e/d1725eebdfdffb64b6fbd6c3c19efa4a.jpg",
    "pageUrl": "https://in.pinterest.com/pin/363102788721335377/",
    "tags": "ya allah islamic wallpaper muslim night",
    "description": "ya allah islamic wallpaper muslim night latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/a6/eb/24/a6eb2409db03fa0f54ae4a9d4af49806.jpg",
    "fullUrl": "https://i.pinimg.com/564x/a6/eb/24/a6eb2409db03fa0f54ae4a9d4af49806.jpg",
    "pageUrl": "https://in.pinterest.com/pin/356769601744541008/",
    "tags": "islamic wallpaper muslim night",
    "description": "islamic wallpaper muslim night popular"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/ad/73/c6/ad73c6bc8af15f3dbd11972b82682379.jpg",
    "fullUrl": "https://i.pinimg.com/564x/ad/73/c6/ad73c6bc8af15f3dbd11972b82682379.jpg",
    "pageUrl": "https://in.pinterest.com/pin/92534967353123889/",
    "tags": "islamic wallpaper muslim",
    "description": "islamic wallpaper muslim latest"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/f3/7e/c4/f37ec43113fd82ddf71047ed56861c3b.jpg",
    "fullUrl": "https://i.pinimg.com/564x/f3/7e/c4/f37ec43113fd82ddf71047ed56861c3b.jpg",
    "pageUrl": "https://in.pinterest.com/pin/141722719515849202/",
    "tags": "subhanallah alhamdu lilah islamic wallpaper beach background thikr",
    "description": "subhanallah alhamdu lilah islamic wallpaper beach background thikr"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/ae/19/5e/ae195e559502256df1bccf696e4e8ef6.jpg",
    "fullUrl": "https://i.pinimg.com/originals/ae/19/5e/ae195e559502256df1bccf696e4e8ef6.jpg",
    "pageUrl": "https://in.pinterest.com/pin/42150946505288233/",
    "tags": "subhanallah alhamdu lilah islamic wallpaper beach background thikr",
    "description": "subhanallah alhamdu lilah islamic wallpaper beach background thikr"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/07/6f/1c/076f1c9f2ff8513872eefa9344cf7cf6.jpg",
    "fullUrl": "https://i.pinimg.com/originals/07/6f/1c/076f1c9f2ff8513872eefa9344cf7cf6.jpg",
    "pageUrl": "https://in.pinterest.com/pin/10344274143483594/",
    "tags": "islamic wallpaper beach background thikr",
    "description": "islamic wallpaper beach background thikr"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/54/f5/b6/54f5b67b0a272c14433a7840179165b3.jpg",
    "fullUrl": "https://i.pinimg.com/originals/54/f5/b6/54f5b67b0a272c14433a7840179165b3.jpg",
    "pageUrl": "https://in.pinterest.com/pin/334110866120397530/",
    "tags": "islamic wallpaper beach background thikr",
    "description": "islamic wallpaper beach background thikr"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/18/72/9b/18729b3b0f035f7b5ad36a5096905626.jpg",
    "fullUrl": "https://i.pinimg.com/originals/18/72/9b/18729b3b0f035f7b5ad36a5096905626.jpg",
    "pageUrl": "https://in.pinterest.com/pin/51580358225066043/",
    "tags": "islamic wallpaper beach background thikr",
    "description": "islamic wallpaper beach background thikr"
  },
  {
    "thumbUrl": "https://i.pinimg.com/474x/44/f1/68/44f16862897e824e916aac846c0d119c.jpg",
    "fullUrl": "https://i.pinimg.com/originals/44/f1/68/44f16862897e824e916aac846c0d119c.jpg",
    "pageUrl": "https://in.pinterest.com/pin/15762667439653859/",
    "tags": "islamic wallpaper beach background",
    "description": "islamic wallpaper beach background"
  }
]

router.get("/allwallpapers", (req, res) => {
    res.json(wallpapers)
})
   
router.get("/wallpapers", paginatedResults(wallpapers), (req, res) => {
    res.json(res.paginatedResults)
});

module.exports = router