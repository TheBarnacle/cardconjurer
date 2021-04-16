//Create objects for common properties across available frames
var masks = [{src:'/img/frames/custom/brawl/center.svg', name:'Center'}, {src:'/img/frames/custom/brawl/second.svg', name:'Second'}, {src:'/img/frames/custom/brawl/third.svg', name:'Third'}, {src:'/img/frames/custom/brawl/wings.svg', name:'Wings'}];
var bounds = {x:0.0087, y:0, width:0.9814, height:0.1262};
//defines available frames
availableFrames = [
	{name:'Legend Crown Cutout', src:'/img/frames/modal/crowns/cutout.svg', erase:true},
	{name:'White Crown', src:'/img/frames/modal/crowns/brawl/w.png', masks:masks, bounds:bounds},
	{name:'Blue Crown', src:'/img/frames/modal/crowns/brawl/u.png', masks:masks, bounds:bounds},
	{name:'Black Crown', src:'/img/frames/modal/crowns/brawl/b.png', masks:masks, bounds:bounds},
	{name:'Red Crown', src:'/img/frames/modal/crowns/brawl/r.png', masks:masks, bounds:bounds},
	{name:'Green Crown', src:'/img/frames/modal/crowns/brawl/g.png', masks:masks, bounds:bounds},
	{name:'Multicolored Crown', src:'/img/frames/modal/crowns/brawl/m.png', masks:masks, bounds:bounds},
	{name:'Artifact Crown', src:'/img/frames/modal/crowns/brawl/a.png', masks:masks, bounds:bounds},
	{name:'Land Crown', src:'/img/frames/modal/crowns/brawl/l.png', masks:masks, bounds:bounds}
];
//disables/enables the "Load Frame Version" button
document.querySelector('#loadFrameVersion').disabled = true;
//defines process for loading this version, if applicable
document.querySelector('#loadFrameVersion').onclick = null;
//loads available frames
loadFramePack();