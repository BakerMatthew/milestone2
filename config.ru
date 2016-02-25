use Rack::Static,
  :urls => [""],
  :root => "bin",
  :index => 'www'


run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('bin/www', File::RDONLY)
  ]
}
