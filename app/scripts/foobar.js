//G+
function gclick() {
  popUp=window.open('https://plusone.google.com/_/+1/confirm?hl=en-US&url=http://foobarbar.cloudfoundry.com/', 'popupwindow', 'scrollbars=yes,width=800,height=400');popUp.focus();return false;
}

//FB sharing
function fbs_click() {
  u=location.href;t=document.title;window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');return false;
}


//Popup Tweet window
function poptweet(url) {
	newwindow=window.open(url,'name','height=435,width=600');
	if (window.focus) {newwindow.focus()}
	return false;
}