App.Views.CodemarkList = Backbone.View.extend
  initialize: ->
    @codemarks = @options.codemarks
    @codemarks.bind 'reset', => @render()

  render: ->
    @renderControlPanel()
    @$el.html(@codemarksHtml())

  renderControlPanel: ->
    @sidebar ||= new App.Views.Sidebar
      codemarks: @codemarks
    @sidebar.render()

  codemarksHtml: ->
    $codemarks = $('<div class="codemarks"></div>')
    for codemark in @codemarks.models
      codemarkView = new App.Views.Codemark
        model: codemark
      codemarkView.render()
      $codemarks.append(codemarkView.$el)
    $codemarks.append(@pagination())
    $codemarks

  pagination: ->
    codemarkView = new App.Views.Pagination
      collection: @codemarks
    codemarkView.render()
    codemarkView.$el
