Dir[File.join(settings.root, 'routes', '*.rb')].each do |f|
  require f
end