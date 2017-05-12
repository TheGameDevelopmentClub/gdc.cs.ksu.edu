@extends('layout')

@section('content')
  <h2><em>Who</em> Are We?</h2>
  K-State's Game Development Club is the club to be in at K-State. We get together every week to develop every kind of game imaginable. We welcome all majors and skill levels to join us as we discuss aspects of game development, gaming trends, and just about anything else our members want to discuss. To see the games we have worked on check out our <a title="Games" href="https://gdc.cis.ksu.edu/?page_id=14">Games page</a>.

  Interested in joining GDC? Do you:
  <ul>
  	<li>Enjoy programming.</li>
  	<li>Enjoy writing stories or scripts</li>
  	<li>Enjoy writing or composing music/soundtracks</li>
  	<li>Enjoy creating 3D models</li>
  	<li>Enjoy drawing</li>
  	<li>Learning more about any or all of the above</li>
  	<li>Just have great ideas and enjoy games.</li>
  </ul>
  If you said yes to any of the above, then you are just the person we are looking for. Come to any of our meeting to join.

  <h2><em>When</em> and <em>Where</em> Do We Meet?</h2>
  <ul>
  	<li>Monday nights, 7:30 p.m. to 9:00 p.m.</li>
  	<li>Durland Expansion (Engineering Complex), Kansas State University Campus</li>
  	<li>Room DUE 1114</li>
  </ul>
  <h2>Officers</h2>
    <table>
      <tr>
        <th>President</th>
        <td>{{$officers['President']->name}}</td>
      </tr>
      <tr>
        <th>Vice President</th>
        <td>{{$officers['Vice President']->name}}</td>
      </tr>
      <tr>
        <th>Treasurer</th>
        <td>{{$officers['Treasurer']->name}}</td>
      </tr>
      <tr>
        <th>Event Manager</th>
        <td>{{$officers['Event Manager']->name}}</td>
      </tr>
      <tr>
        <th>Industry Liaison</th>
        <td>{{$officers['Industry Liaison']->name}}</td>
      </tr>
      <tr>
        <th>Website Manager</th>
        <td>{{$officers['Website Manager']->name}}</td>
      </tr>
      <tr>
        <th>Social Media Manager</th>
        <td>{{$officers['Social Media Manager']->name}}</td>
      </tr>
    </table>


@endsection
