import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';
import { $ } from 'meteor/jquery';

/**
* @summary promise that gets the template configured on settings.json
*/
const promise = new Promise((resolve) => {
  HTTP.get(Meteor.absoluteUrl(Meteor.settings.public.web.template.settings), function (err, result) {
    if (!err) {
      resolve(result.data);
    }
  });
});

/**
* @summary any custom content that goes to the header when logged out
* @param {string} templateName to use
*/
const _getHeader = async () => {
  const result = await promise;
  return result.header.html;
};

/**
* @summary gets the list of files to include in the html head
*/
const _getStyles = async () => {
  const result = await promise;
  const styles = result.spreadsheets.list;

  for (let i = 0; i < styles.length; i += 1) {
    $('head').append($('<link>', {
      rel: 'stylesheet',
      type: 'text/css',
      href: styles[i],
    }));
  }
};

export const getCSS = _getStyles;
export const getHeader = _getHeader;