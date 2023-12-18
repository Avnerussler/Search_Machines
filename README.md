# Search Machines React Interview Test

## Introduction
Part of Search Machines ATLAS product allows account managers to create and manage ad templates.  These templates are used to generate Ads that are uploaded to Bing and Google.  

## Aim
The aim of the exercise is to create an interface where users can preview what ads might be generated from a given template.

 - Parse the example template to create a form to allow the user to enter test parameter values.  Parameters in the template are surrounded with curly braces like `{airline}`.  With the current test template you should end up with a form where the user enters values for `airline` and `destination`.  The form should be positioned to the right of the existing template component.

 - Whenever the user changes parameter values or the ad template then display a sample ad to the user by substituting parameters from the template in curly braces (e.g. `{example}`) with the values entered by the user.  The sample ad should be positioned to the right of the form.

 - Standard Google ads consist of 2 headlines, a description and a path, e.g.
 ```
  <Headline1> - <Headline2>
  path1/path2
  <Description1>
```
 - Maximum element lengths are: headlines: 30 characters, descriptions: 80 characters, paths: 15 characters.  If the length of an element exceeds the maximum any optional elements (In square brackets, e.g. `[Cheap ]`) should be removed first.  If the element is still too long then an error message should be displayed.

## Hints
- Make sure you aren't running an adblocker or some of the UI may not display.
