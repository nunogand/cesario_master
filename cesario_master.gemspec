# frozen_string_literal: true

Gem::Specification.new do |spec|
  spec.name          = "cesario_master"
  spec.version       = "0.1.0"
  spec.authors       = ["nunogand"]
  spec.email         = ["nunogand@gmail.com"]

  spec.summary       = "Jekyll theme used to publish a poetry book"
  spec.homepage      = "TODO: Put your gem's website or public repo URL here."
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r!^(assets|_layouts|_includes|_sass|LICENSE|README|_config\.yml)!i) }

  spec.add_runtime_dependency "jekyll", "~> 4.2"
end
