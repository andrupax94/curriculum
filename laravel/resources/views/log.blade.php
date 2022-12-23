@extends('fv/basichtml')


@section('css1')
@include('fv/basiccss')

@endsection('css1')
@section('js1')
@include('fv/basicjs')
<script src="views/log/js.js"></script>


@endsection('js1')
@section('contend')


<main id="container" class="flexc">
    <div id="subContainer" class="col-12"  ng-view>

    </div>

</main>

@endsection('content')
