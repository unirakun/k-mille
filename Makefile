build-push-expenses:
	@docker build -t alakarte/expenses --build-arg app=expenses . --rm=true
	@docker push alakarte/expenses

build-push-invoices:
	@docker build -t alakarte/invoices --build-arg app=invoices . --rm=true
	@docker push alakarte/expenses

build-push: build-push-expenses build-push-invoices
